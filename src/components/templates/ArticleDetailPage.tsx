// /regulasi/[slug] · /en/regulations/[slug] and /news/[slug] · /en/news/[slug]. Published only; drafts → 404.
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Download } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { href } from '@/i18n/routes'
import type { Post, Regulation } from '@/payload-types'
import { asMedia, getPostBySlug, getPosts, getRegulationBySlug, getRegulations, getSite, getUi } from '@/lib/cms'
import { whatsappHref } from '@/lib/whatsapp'
import { PageHeader } from '@/components/content/PageHeader'
import { Prose } from '@/components/content/Prose'
import { NewsCard } from '@/components/content/NewsCard'
import { DocCard, fileSize } from '@/components/content/Listing'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CtaBanner } from '@/components/layout/CtaBanner'
import type { Kind } from './ArticlesPage'
import { articleLd } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'

const load = (kind: Kind, locale: Locale, slug: string) => (kind === 'regulations' ? getRegulationBySlug(locale, slug) : getPostBySlug(locale, slug))

export async function articleMetadata(kind: Kind, locale: Locale, slug: string): Promise<Metadata> {
  const doc = await load(kind, locale, slug)
  if (!doc) return {}
  const seo = (doc as Post).seo
  const summary = kind === 'regulations' ? (doc as Regulation).summary : (doc as Post).excerpt
  return pageMetadata({ locale, route: kind, slug, title: seo?.title || doc.title, description: seo?.description || summary,
    image: asMedia(seo?.ogImage) ?? (doc as Post).cover, type: 'article', modifiedTime: doc.updatedAt,
    publishedTime: kind === 'regulations' ? (doc as Regulation).issuedAt : (doc as Post).publishedAt })
}

function formatDate(value: string | null | undefined, locale: Locale) {
  return value ? new Date(value).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null
}

export async function ArticleDetailPage({ kind, locale, slug }: { kind: Kind; locale: Locale; slug: string }) {
  const [doc, ui, site] = await Promise.all([load(kind, locale, slug), getUi(locale), getSite(locale)])
  if (!doc) notFound()
  const m = getMessages(locale)
  const isReg = kind === 'regulations'
  const reg = doc as Regulation
  const post = doc as Post
  const categoryLabel = isReg
    ? m.regulationCategories.find(c => c.value === reg.category)?.label ?? reg.category
    : (m.home.categories as Record<string, string>)[post.category] ?? post.category
  const date = formatDate(isReg ? reg.issuedAt : post.publishedAt, locale)
  const listLabel = (isReg ? ui.nav?.regulations : ui.nav?.news) || ''
  const relatedSource = isReg ? await getRegulations(locale, { category: reg.category }) : await getPosts(locale, {})
  const related = relatedSource.docs.filter(d => d.slug !== doc.slug).slice(0, 3)
  const cover = isReg ? null : asMedia(post.cover)
  const wa = whatsappHref(site.whatsapp, site.whatsappDefaultMessage)

  return (
    <>
      <JsonLd data={articleLd({ kind, slug: doc.slug, title: doc.title, description: isReg ? reg.summary : post.excerpt,
        published: isReg ? reg.issuedAt : post.publishedAt, modified: doc.updatedAt, image: cover }, locale)} />
      <PageHeader title={doc.title} intro={isReg ? reg.summary : post.excerpt} crumbLabel={m.services.breadcrumb}
        crumbs={[{ label: ui.nav?.home || 'Home', href: href(locale, 'home') }, { label: listLabel, href: href(locale, kind) }, { label: doc.title }]} />

      <section className="ag-section">
        <div className="ag-container ag-detail">
          <article className="ag-detail__main">
            {cover?.url && cover.width && cover.height ? (
              <Image className="ag-article__cover" src={cover.sizes?.hero?.url || cover.url} alt={cover.alt || ''} width={cover.width} height={cover.height} preload sizes="(max-width: 1023px) 100vw, 760px" />
            ) : null}
            {(isReg && reg.number && reg.number !== reg.title) || date ? <dl className="ag-meta">
              {isReg && reg.number && reg.number !== reg.title ? <div><dt>{m.articles.number}</dt><dd>{reg.number}</dd></div> : null}
              {date ? <div><dt>{isReg ? m.articles.issued : m.articles.published}</dt><dd><time dateTime={(isReg ? reg.issuedAt : post.publishedAt) || undefined}>{date}</time></dd></div> : null}
            </dl> : null}
            <Prose data={doc.body} />
            {isReg && reg.attachments?.length ? (
              <div className="ag-attachments">
                <h2 className="ag-eyebrow">{m.articles.attachments}</h2>
                <ul>
                  {reg.attachments.map((a, i) => {
                    const f = asMedia(a.file)
                    return f?.url ? (
                      <li key={a.id ?? i}>
                        <a className="ag-btn ag-btn--outline" href={f.url} download target="_blank" rel="noopener">
                          <Download size={18} aria-hidden="true" />{a.label || ui.cta?.download}
                          <span className="ag-attachments__size">{m.articles.pdf} · {fileSize(f.filesize, locale)}</span>
                        </a>
                      </li>
                    ) : null
                  })}
                </ul>
              </div>
            ) : null}
          </article>
        </div>
      </section>

      {related.length ? (
        <section className="ag-section ag-section--soft" aria-labelledby="related-title">
          <div className="ag-container ag-stack">
            <SectionHeading id="related-title" title={isReg ? m.articles.relatedRegulations : m.articles.relatedNews} />
            <ul className="ag-grid ag-grid--3">
              {related.map(r => (
                <li key={r.id}>
                  {isReg
                    ? <DocCard title={r.title} href={href(locale, kind, r.slug)} category={categoryLabel} meta={(r as Regulation).number !== r.title ? (r as Regulation).number : null} />
                    : <NewsCard locale={locale} title={r.title} href={href(locale, kind, r.slug)} category={categoryLabel}
                        date={(r as Post).publishedAt} cover={asMedia((r as Post).cover)} readLabel={ui.cta?.read || ''} />}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBanner title={m.ctaBanner.title} text={m.ctaBanner.text}
        primary={{ label: ui.cta?.whatsapp || '', href: wa }} secondary={{ label: ui.cta?.consult || '', href: href(locale, 'contact') }} />
    </>
  )
}

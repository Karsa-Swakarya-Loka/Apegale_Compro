// Listing for /regulasi · /en/regulations and /news · /en/news: category chips (?kategori=), 9 per page (?halaman=).
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { href } from '@/i18n/routes'
import { asMedia, getPosts, getRegulations, getSite, getUi } from '@/lib/cms'
import { whatsappHref } from '@/lib/whatsapp'
import { PageHeader } from '@/components/content/PageHeader'
import { NewsCard } from '@/components/content/NewsCard'
import { CategoryFilter, DocCard, EmptyState, Pagination, fileSize } from '@/components/content/Listing'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/BrandIcons'
import { Reveal } from '@/components/motion/Reveal'
import { CtaBanner } from '@/components/layout/CtaBanner'

export type Kind = 'regulations' | 'news'
export type ListQuery = { kategori?: string; halaman?: string }

function categoriesFor(kind: Kind, locale: Locale) {
  const m = getMessages(locale)
  return kind === 'regulations'
    ? m.regulationCategories.map(c => ({ value: c.value as string, label: c.label as string }))
    : [{ value: 'news', label: m.home.categories.news as string }, { value: 'panduan', label: m.home.categories.panduan as string }]
}

export async function articlesMetadata(kind: Kind, locale: Locale): Promise<Metadata> {
  const [ui, m] = [await getUi(locale), getMessages(locale)]
  const page = kind === 'regulations' ? ui.pages?.regulations : ui.pages?.news
  const title = kind === 'regulations' ? m.articles.regulationsTitle : m.articles.newsTitle
  return pageMetadata({ locale, route: kind, title: page?.seo?.title || title, image: page?.seo?.ogImage,
    description: page?.seo?.description || page?.intro || (kind === 'regulations' ? m.articles.regulationsIntro : m.articles.newsIntro) })
}

export async function ArticlesPage({ kind, locale, query }: { kind: Kind; locale: Locale; query: ListQuery }) {
  const m = getMessages(locale)
  const categories = categoriesFor(kind, locale)
  const category = categories.some(c => c.value === query.kategori) ? query.kategori : undefined
  const page = Math.max(1, Number.parseInt(query.halaman || '1', 10) || 1)
  const [ui, site, result] = await Promise.all([
    getUi(locale), getSite(locale),
    kind === 'regulations' ? getRegulations(locale, { category, page }) : getPosts(locale, { category, page }),
  ])
  if (page > 1 && page > result.totalPages) notFound()
  const base = href(locale, kind)
  const listHref = (opts: { kategori?: string; halaman?: number }) => {
    const p = new URLSearchParams()
    if (opts.kategori) p.set('kategori', opts.kategori)
    if (opts.halaman && opts.halaman > 1) p.set('halaman', String(opts.halaman))
    const q = p.toString()
    return q ? `${base}?${q}` : base
  }
  const catLabel = (value: string) => categories.find(c => c.value === value)?.label ?? value
  const isReg = kind === 'regulations'
  const wa = whatsappHref(site.whatsapp, site.whatsappDefaultMessage)
  const pageInfo = isReg ? ui.pages?.regulations : ui.pages?.news

  return (
    <>
      <PageHeader title={isReg ? m.articles.regulationsTitle : m.articles.newsTitle}
        intro={(isReg && category ? m.regulationCategories.find(c => c.value === category)?.intro : '') || pageInfo?.intro || (isReg ? m.articles.regulationsIntro : m.articles.newsIntro)} crumbLabel={m.services.breadcrumb}
        crumbs={[{ label: ui.nav?.home || 'Home', href: href(locale, 'home') }, { label: (isReg ? ui.nav?.regulations : ui.nav?.news) || '' }]} />

      <section className="ag-section" aria-labelledby="articles-list-title">
        <div className="ag-container ag-stack">
          <h2 id="articles-list-title" className="ag-visually-hidden">{isReg ? m.articles.regulationsTitle : m.articles.newsTitle}</h2>
          <CategoryFilter label={m.articles.filterLabel} chips={[
            { label: m.articles.all, href: listHref({}), active: !category },
            ...categories.map(c => ({ label: c.label, href: listHref({ kategori: c.value }), active: category === c.value })),
          ]} />

          {result.docs.length ? (
            <ul className="ag-grid ag-grid--3">
              {result.docs.map((d, i) => {
                const doc = d as unknown as Record<string, unknown> & { id: number; slug: string; title: string; category: string }
                const detail = href(locale, kind, doc.slug)
                return (
                  <li key={doc.id}>
                    <Reveal step={(i % 3) as 0 | 1 | 2}>
                      {isReg ? (
                        <DocCard title={doc.title} href={detail} category={catLabel(doc.category)} meta={doc.number && doc.number !== doc.title ? (doc.number as string) : null}
                          fileInfo={(() => { const f = asMedia((doc.attachments as { file: unknown }[] | undefined)?.[0]?.file); return f ? `${m.articles.pdf} · ${fileSize(f.filesize, locale)}` : null })()} />
                      ) : (
                        <NewsCard locale={locale} title={doc.title} href={detail} category={catLabel(doc.category)}
                          date={doc.publishedAt as string | null} cover={asMedia(doc.cover)} readLabel={ui.cta?.read || ''} />
                      )}
                    </Reveal>
                  </li>
                )
              })}
            </ul>
          ) : (
            <EmptyState title={isReg ? m.articles.emptyRegulations : m.articles.emptyNews} hint={m.articles.emptyHint}
              action={wa ? <Button variant="wa" href={wa} label={ui.cta?.askWhatsapp || ''} icon={<WhatsAppIcon size={20} />} /> : null} />
          )}

          <Pagination page={result.page} totalPages={result.totalPages} hrefFor={n => listHref({ kategori: category, halaman: n })}
            labels={{ nav: m.articles.pagination, prev: m.articles.prev, next: m.articles.next, pageOf: m.articles.pageOf }} />
        </div>
      </section>

      <CtaBanner title={m.ctaBanner.title} highlight={m.ctaBanner.highlight} text={m.ctaBanner.text}
        primary={{ label: ui.cta?.whatsapp || '', href: wa }} secondary={{ label: ui.cta?.consult || '', href: href(locale, 'contact') }} />
    </>
  )
}

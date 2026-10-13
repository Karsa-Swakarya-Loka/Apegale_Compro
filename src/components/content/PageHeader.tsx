import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import { asMedia, getHome } from '@/lib/cms'
import { breadcrumbLd } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { HeroClipDefs } from '@/components/ui/HeroClipDefs'

type Crumb = { label: string; href?: string }
type Props = {
  locale: Locale; eyebrow?: string | null; title: string; intro?: string | null; crumbs: Crumb[]; crumbLabel: string; actions?: ReactNode
  /** News pages keep the plain v10 header (white, red slash); every other page gets the home-style header. */
  plain?: boolean
}

function Crumbs({ crumbs, label, className }: { crumbs: Crumb[]; label: string; className?: string }) {
  return (
    <nav aria-label={label} className={className}>
      <ol className="ag-crumbs">
        {crumbs.map((c, i) => (
          <li key={`${c.label}-${i}`}>
            {i > 0 ? <ChevronRight size={14} aria-hidden="true" /> : null}
            {c.href && i < crumbs.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Inner-page header. Default: the home hero's look without the slider (reference: unifato "Cargon" home 3) — light
 *  field under the floating capsule header, breadcrumb in the badge, large title, intro, optional pill actions, the
 *  hero photo in the slanted rounded panel, entrance animation on load. `plain`: the v10 header used by the news pages. */
export async function PageHeader({ locale, eyebrow, title, intro, crumbs, crumbLabel, actions, plain }: Props) {
  if (plain) {
    return (
      <section className="ag-pagehead">
        <JsonLd data={breadcrumbLd(crumbs)} />
        <span className="ag-pagehead__plane" aria-hidden="true" />
        <div className="ag-container ag-pagehead__in">
          <Crumbs crumbs={crumbs} label={crumbLabel} />
          <div className="ag-sechead">
            {eyebrow ? <span className="ag-eyebrow">{eyebrow}</span> : null}
            <h1>{title}</h1>
            {intro ? <p>{intro}</p> : null}
          </div>
          {actions ? <div className="ag-row">{actions}</div> : null}
        </div>
      </section>
    )
  }
  const home = await getHome(locale)
  const image = asMedia(home.hero?.image)
  const photo = image?.sizes?.hero?.url ? image.sizes.hero : image
  return (
    <section className="ag-pagehero">
      <JsonLd data={breadcrumbLd(crumbs)} />
      <HeroClipDefs />
      {photo?.url && photo.width && photo.height ? (
        <div className="ag-hero__media" aria-hidden="true">
          <div className="ag-hero__photo">
            <Image src={photo.url} alt="" fill loading="eager" sizes="(max-width: 1023px) 100vw, 52vw" />
          </div>
        </div>
      ) : null}
      <svg className="ag-hero__wave" viewBox="0 0 220 300" aria-hidden="true" focusable="false">
        <path d="M70 300 C 40 240, 120 200, 70 150 S -40 80, -60 40" />
        <path d="M110 300 C 90 230, 150 190, 95 140 S -20 60, -50 10" />
      </svg>
      <div className="ag-pagehero__in">
        <div className="ag-pagehero__copy">
          <Crumbs crumbs={crumbs} label={crumbLabel} className="ag-hero__badge ag-pagehero__crumbs" />
          {eyebrow ? <span className="ag-eyebrow">{eyebrow}</span> : null}
          <h1 className="ag-pagehero__title">{title}</h1>
          {intro ? <p className="ag-pagehero__lead">{intro}</p> : null}
          {actions ? <div className="ag-pagehero__cta">{actions}</div> : null}
        </div>
      </div>
    </section>
  )
}

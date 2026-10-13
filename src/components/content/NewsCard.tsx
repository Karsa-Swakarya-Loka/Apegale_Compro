import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Media } from '@/payload-types'

type Props = { title: string; href: string; category: string; date?: string | null; locale: 'id' | 'en'; cover?: Media | null; readLabel: string }

/** design/components/NewsCard — 16:9 cover (maroon-deep when absent), category chip, date, title. */
export function NewsCard({ title, href, category, date, locale, cover, readLabel }: Props) {
  const when = date ? new Date(date) : null
  return (
    <article className="ag-card ag-news">
      <div className="ag-news__img">
        {cover?.url && cover.width && cover.height
          ? <Image src={cover.sizes?.card?.url || cover.url} alt={cover.alt || ''} fill sizes="(max-width: 767px) 100vw, 33vw" />
          : null}
      </div>
      <div className="ag-news__body">
        <div className="ag-news__meta">
          <span className="ag-chip">{category}</span>
          {when ? <time dateTime={when.toISOString()}>{when.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</time> : null}
        </div>
        <h3><Link href={href} className="ag-news__link">{title}</Link></h3>
        <span className="ag-btn ag-btn--ghost" aria-hidden="true">{readLabel}<ArrowRight size={18} /></span>
      </div>
    </article>
  )
}

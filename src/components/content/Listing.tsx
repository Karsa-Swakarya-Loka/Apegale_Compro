// Shared listing parts for Regulasi and News: category chips, pagination, document card, empty state.
import Link from 'next/link'
import type { ReactNode } from 'react'
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react'

type Chip = { label: string; href: string; active: boolean }

export function CategoryFilter({ chips, label }: { chips: Chip[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ul className="ag-chips">
        {chips.map(c => (
          <li key={c.href}><Link href={c.href} className="ag-chip-link" aria-current={c.active ? 'page' : undefined}>{c.label}</Link></li>
        ))}
      </ul>
    </nav>
  )
}

type PaginationProps = { page: number; totalPages: number; hrefFor: (page: number) => string; labels: { nav: string; prev: string; next: string; pageOf: string } }

export function Pagination({ page, totalPages, hrefFor, labels }: PaginationProps) {
  if (totalPages <= 1) return null
  return (
    <nav className="ag-pager" aria-label={labels.nav}>
      {page > 1 ? <Link className="ag-pager__step" href={hrefFor(page - 1)} rel="prev"><ChevronLeft size={18} aria-hidden="true" />{labels.prev}</Link> : <span />}
      <ol>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
          <li key={n}>
            <Link href={hrefFor(n)} aria-current={n === page ? 'page' : undefined}
              aria-label={labels.pageOf.replace('{page}', String(n)).replace('{total}', String(totalPages))}>{n}</Link>
          </li>
        ))}
      </ol>
      {page < totalPages ? <Link className="ag-pager__step" href={hrefFor(page + 1)} rel="next">{labels.next}<ChevronRight size={18} aria-hidden="true" /></Link> : <span />}
    </nav>
  )
}

type DocCardProps = { title: string; href: string; category: string; meta?: string | null; fileInfo?: string | null }

/** Regulation card: document icon, category chip, title (link covers the card), PDF size. */
export function DocCard({ title, href, category, meta, fileInfo }: DocCardProps) {
  return (
    <article className="ag-card ag-doc">
      <div className="ag-doc__top">
        <span className="ag-doc__icon"><FileText size={22} aria-hidden="true" /></span>
        <span className="ag-chip">{category}</span>
      </div>
      <h3><Link href={href} className="ag-news__link">{title}</Link></h3>
      {meta || fileInfo ? <p className="ag-doc__meta">{[meta, fileInfo].filter(Boolean).join(' · ')}</p> : null}
    </article>
  )
}

export function EmptyState({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="ag-empty">
      <FileText size={32} aria-hidden="true" />
      <p className="ag-empty__title">{title}</p>
      {hint ? <p>{hint}</p> : null}
      {action}
    </div>
  )
}

export function fileSize(bytes?: number | null, locale: 'id' | 'en' = 'id') {
  if (!bytes) return null
  const mb = bytes / 1024 / 1024
  const fmt = new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-US', { maximumFractionDigits: 1 })
  return mb >= 1 ? `${fmt.format(mb)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`
}

import Link from 'next/link'
import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import { breadcrumbLd } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'

type Crumb = { label: string; href?: string }
type Props = { eyebrow?: string | null; title: string; intro?: string | null; crumbs: Crumb[]; crumbLabel: string; actions?: ReactNode }

/** Inner-page header: breadcrumb (+ BreadcrumbList JSON-LD), eyebrow, H1, intro, optional actions, over a smaller diagonal slab. */
export function PageHeader({ eyebrow, title, intro, crumbs, crumbLabel, actions }: Props) {
  return (
    <section className="ag-pagehead">
      <JsonLd data={breadcrumbLd(crumbs)} />
      <div className="ag-pagehead__slab" aria-hidden="true" />
      <div className="ag-container ag-pagehead__in">
        <nav aria-label={crumbLabel}>
          <ol className="ag-crumbs">
            {crumbs.map((c, i) => (
              <li key={`${c.label}-${i}`}>
                {i > 0 ? <ChevronRight size={14} aria-hidden="true" /> : null}
                {c.href && i < crumbs.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
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

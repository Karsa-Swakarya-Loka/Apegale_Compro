import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'

export type SubService = { label: string; href?: string; children?: { label: string; href: string }[] }
/** Sub-list of a top-level service. A service that lists its scope (Company Profile p. 4) shows that list as plain
 *  items; otherwise its published sub-pages are shown as links. */
export function toSubServices(s: { items?: string[]; children: { slug: string; title: string; children: { slug: string; title: string }[] }[] }, serviceHref: (slug: string) => string): SubService[] {
  if (s.items?.length) return s.items.map(label => ({ label }))
  return s.children.map(c => ({ label: c.title, href: serviceHref(c.slug), children: c.children.map(g => ({ label: g.title, href: serviceHref(g.slug) })) }))
}
type Props = { icon?: string | null; title: string; summary?: string | null; href: string; subServices?: SubService[]; moreLabel: string }

/** Service entry (design v10): an open block under a hairline, numbered by its list, line icon, uppercase title,
 *  summary, and a red slash that runs along the rule on hover. The title link covers the entry; sub-services stay
 *  separate links above it (no nested anchors). */
export function ServiceCard({ icon, title, summary, href, subServices, moreLabel }: Props) {
  return (
    <article className="ag-card ag-service">
      <span className="ag-service__icon"><Icon name={icon} size={24} /></span>
      <h3><Link href={href} className="ag-service__link">{title}</Link></h3>
      {summary ? <p>{summary}</p> : null}
      {subServices?.length ? (
        <ul className="ag-service__subs">
          {subServices.map(s => (
            <li key={s.href ?? s.label}>
              {s.href ? <Link href={s.href}>{s.label}</Link> : s.label}
              {s.children?.length ? <ul>{s.children.map(c => <li key={c.href}><Link href={c.href}>{c.label}</Link></li>)}</ul> : null}
            </li>
          ))}
        </ul>
      ) : null}
      <span className="ag-service__more" aria-hidden="true">{moreLabel}<ArrowRight size={16} /></span>
    </article>
  )
}

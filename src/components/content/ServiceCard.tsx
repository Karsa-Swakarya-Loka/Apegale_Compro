import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'

type Props = { icon?: string | null; title: string; summary?: string | null; href: string; subServices?: { label: string; href: string }[]; moreLabel: string }

/** Template slide 04 service card: icon in a maroon hexagon, uppercase title, summary, accent bar that grows on hover.
 *  The title link covers the card; sub-services stay separate links above it (no nested anchors). */
export function ServiceCard({ icon, title, summary, href, subServices, moreLabel }: Props) {
  return (
    <article className="ag-card ag-service">
      <span className="ag-service__icon"><Icon name={icon} size={24} /></span>
      <h3><Link href={href} className="ag-service__link">{title}</Link></h3>
      {summary ? <p>{summary}</p> : null}
      {subServices?.length ? (
        <ul className="ag-service__subs">{subServices.map(s => <li key={s.href}><Link href={s.href}>{s.label}</Link></li>)}</ul>
      ) : null}
      <span className="ag-service__more" aria-hidden="true">{moreLabel}<ArrowRight size={16} /></span>
    </article>
  )
}

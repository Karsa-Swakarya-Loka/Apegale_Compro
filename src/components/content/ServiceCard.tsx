import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'

type Props = { icon?: string | null; title: string; summary?: string | null; href: string; subServices?: { label: string; href: string }[]; moreLabel: string }

/** design/components/ServiceCard. The title is the card's link; sub-services are separate links (no nested anchors). */
export function ServiceCard({ icon, title, summary, href, subServices, moreLabel }: Props) {
  return (
    <article className="ag-card ag-service">
      <span className="ag-service__icon"><Icon name={icon} /></span>
      <h3><Link href={href} className="ag-service__link">{title}</Link></h3>
      {summary ? <p>{summary}</p> : null}
      {subServices?.length ? (
        <ul>{subServices.map(s => <li key={s.href}><Link href={s.href}>{s.label}</Link></li>)}</ul>
      ) : null}
      <span className="ag-btn ag-btn--ghost ag-service__more" aria-hidden="true">{moreLabel}<ArrowRight size={18} /></span>
    </article>
  )
}

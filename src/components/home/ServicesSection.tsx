import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceCard } from '@/components/content/ServiceCard'
import { Reveal } from '@/components/motion/Reveal'

type Service = { slug: string; title: string; summary?: string | null; icon?: string | null; href: string }
type Props = {
  title: string; highlight?: string; intro?: string | null; services: Service[]; moreLabel: string
  all?: { label: string; href: string }; index?: string
}

/** Services (design v10): the title stays pinned in a narrow left column while the six services run as a numbered
 *  two-column index on the right. No boxes: hairlines and whitespace carry the structure. */
export function ServicesSection({ title, highlight, intro, services, moreLabel, all, index }: Props) {
  return (
    <section className="ag-section" aria-labelledby="services-title">
      <div className="ag-container ag-services">
        <div className="ag-services__head">
          <Reveal><SectionHeading id="services-title" index={index} title={title} highlight={highlight} intro={intro} /></Reveal>
          {all ? <Button variant="ghost" href={all.href} label={all.label} icon={<ArrowRight size={18} aria-hidden="true" />} /> : null}
        </div>
        <ul className="ag-grid ag-grid--index">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Reveal step={(i % 2) as 0 | 1}>
                <ServiceCard icon={s.icon} title={s.title} summary={s.summary} href={s.href} moreLabel={moreLabel} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

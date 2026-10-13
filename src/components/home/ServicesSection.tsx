import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ServiceCard } from '@/components/content/ServiceCard'
import { Reveal } from '@/components/motion/Reveal'

type Service = { slug: string; title: string; summary?: string | null; icon?: string | null; href: string }
type Props = { title: string; highlight?: string; intro?: string | null; services: Service[]; moreLabel: string; all?: { label: string; href: string } }

/** Template slide 04 "Our services": two-tone title with a link to the full list, then the six services as cards. */
export function ServicesSection({ title, highlight, intro, services, moreLabel, all }: Props) {
  return (
    <section className="ag-section" aria-labelledby="services-title">
      <div className="ag-container ag-stack">
        <div className="ag-headrow">
          <Reveal><SectionHeading id="services-title" title={title} highlight={highlight} intro={intro} /></Reveal>
          {all ? <Button variant="ghost" href={all.href} label={all.label} icon={<ArrowRight size={18} aria-hidden="true" />} /> : null}
        </div>
        <ul className="ag-grid ag-grid--3">
          {services.map((s, i) => (
            <li key={s.slug}>
              <Reveal step={(i % 3) as 0 | 1 | 2}>
                <ServiceCard icon={s.icon} title={s.title} summary={s.summary} href={s.href} moreLabel={moreLabel} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

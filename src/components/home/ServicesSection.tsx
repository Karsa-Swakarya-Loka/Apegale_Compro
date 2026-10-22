import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { SubService } from '@/components/content/ServiceCard'
import { Reveal } from '@/components/motion/Reveal'
import { ServicesDossier } from '@/components/home/ServicesDossier'

type Service = { slug: string; title: string; summary?: string | null; icon?: string | null; href: string; subServices?: SubService[] }
type Props = {
  title: string; highlight?: string; intro?: string | null; services: Service[]; moreLabel: string
  all?: { label: string; href: string }; index?: string
}

const num = (i: number) => String(i + 1).padStart(2, '0')

/** Services as a dossier: all services run in CMS order as a numbered ledger on the right; the folio on the left opens
 *  the selected one (by default the service that carries sub-services, Expatriate Formalities, with its filing tree).
 *  One Reveal wraps the index so rows and tree items enter in sequence (CSS --i delays); swapping is handled client-side. */
export function ServicesSection({ title, highlight, intro, services, moreLabel, all, index }: Props) {
  if (!services.length) return null
  const initial = Math.max(0, services.findIndex(s => s.subServices?.length))
  const rows = services.map((s, i) => ({ slug: s.slug, title: s.title, summary: s.summary, href: s.href, subServices: s.subServices, n: num(i) }))

  return (
    <section className="ag-section" aria-labelledby="services-title">
      <div className="ag-container ag-services">
        <div className="ag-headrow ag-services__head">
          <Reveal><SectionHeading id="services-title" index={index} title={title} highlight={highlight} intro={intro} /></Reveal>
          {all ? <Button variant="ghost" href={all.href} label={all.label} icon={<ArrowRight size={18} aria-hidden="true" />} /> : null}
        </div>
        <Reveal className="ag-ledger">
          <ServicesDossier services={rows} initial={initial} moreLabel={moreLabel} label={title} />
        </Reveal>
      </div>
    </section>
  )
}

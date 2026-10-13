import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

type Item = { icon?: string | null; title?: string | null; text?: string | null }
type Props = { eyebrow?: string | null; title: string; highlight?: string; items: Item[] }

/** Four strengths from the 2026 company profile, on a maroon section (red/white balance). */
export function WhySection({ eyebrow, title, highlight, items }: Props) {
  const rows = items.filter(i => i.title)
  if (!rows.length) return null
  return (
    <section className="ag-section ag-section--brand" aria-labelledby="why-title">
      <div className="ag-container ag-stack">
        <Reveal><SectionHeading id="why-title" eyebrow={eyebrow} title={title} highlight={highlight} /></Reveal>
        <ul className="ag-why">
          {rows.map((w, i) => (
            <li key={w.title}>
              <Reveal step={(i % 3) as 0 | 1 | 2} className="ag-why__item">
                <span className="ag-service__icon"><Icon name={w.icon} /></span>
                <h3>{w.title}</h3>
                {w.text ? <p>{w.text}</p> : null}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

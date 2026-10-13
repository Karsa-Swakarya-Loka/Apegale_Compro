import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

type Item = { icon?: string | null; title?: string | null; text?: string | null }
type Props = { eyebrow?: string | null; title: string; highlight?: string; items: Item[] }

/** Template slide 03 "Our approach": charcoal field, title on the left, the four strengths from the 2026 company
 *  profile as an icon list on the right, diagonal light plane and maroon corner wedge. */
export function WhySection({ eyebrow, title, highlight, items }: Props) {
  const rows = items.filter(i => i.title)
  if (!rows.length) return null
  return (
    <section className="ag-section ag-section--dark ag-approach" aria-labelledby="why-title">
      <span className="ag-approach__plane" aria-hidden="true" />
      <div className="ag-container ag-approach__in">
        <Reveal><SectionHeading id="why-title" eyebrow={eyebrow} title={title} highlight={highlight} /></Reveal>
        <ul className="ag-why">
          {rows.map((w, i) => (
            <li key={w.title}>
              <Reveal step={(i % 3) as 0 | 1 | 2} className="ag-why__item">
                <span className="ag-why__icon"><Icon name={w.icon} size={24} /></span>
                <h3>{w.title}</h3>
                {w.text ? <p>{w.text}</p> : null}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      <span className="ag-wedge" aria-hidden="true" />
    </section>
  )
}

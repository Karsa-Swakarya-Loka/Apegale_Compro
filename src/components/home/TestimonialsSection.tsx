import type { Testimonial as TestimonialDoc } from '@/payload-types'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { Testimonial } from '@/components/content/Testimonial'
import { TestimonialCarousel } from '@/components/content/TestimonialCarousel'

type Props = { title: string; highlight?: string; items: TestimonialDoc[]; labels: { prev: string; next: string; region: string } }

/** "What our clients say": up to three quotes sit in a grid; four or more become a carousel (three per view). */
export function TestimonialsSection({ title, highlight, items, labels }: Props) {
  const rows = items.filter(t => t.quote)
  if (!rows.length) return null
  return (
    <section className="ag-section" aria-labelledby="testimonials-title">
      <div className="ag-container ag-stack">
        <Reveal><SectionHeading id="testimonials-title" title={title} highlight={highlight} /></Reveal>
        {rows.length <= 3
          ? <div className="ag-grid ag-grid--3">{rows.map(t => <Testimonial key={t.id} item={t} />)}</div>
          : <TestimonialCarousel labels={labels} items={rows.map(t => ({ id: t.id, quote: t.quote as string, name: t.name, byline: [t.role, t.company].filter(Boolean).join(', ') }))} />}
      </div>
    </section>
  )
}

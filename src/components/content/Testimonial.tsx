import type { Testimonial as TestimonialDoc } from '@/payload-types'

/** design/components/Testimonial — published entries with consent only; never placeholder text in production. */
export function Testimonial({ item }: { item: TestimonialDoc }) {
  if (!item.quote) return null
  return (
    <figure className="ag-card ag-quote">
      <span className="ag-quote__mark" aria-hidden="true">&ldquo;</span>
      <blockquote>{item.quote}</blockquote>
      <figcaption><b>{item.name}</b><span>{[item.role, item.company].filter(Boolean).join(', ')}</span></figcaption>
    </figure>
  )
}

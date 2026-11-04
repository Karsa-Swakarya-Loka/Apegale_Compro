'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export type QuoteItem = { id: string | number; quote: string; name: string; byline: string }
type Props = { items: QuoteItem[]; labels: { prev: string; next: string; region: string } }

/** More than three testimonials: a swipeable row, three cards per view on desktop (two on tablet, one on phones), with
 *  previous/next buttons and a "1-3 / 8" counter. Scroll-snap does the work, so touch, trackpad and keyboard scrolling
 *  all behave natively. */
export function TestimonialCarousel({ items, labels }: Props) {
  const track = useRef<HTMLUListElement>(null)
  const [range, setRange] = useState({ first: 1, last: Math.min(3, items.length) })

  const measure = useCallback(() => {
    const el = track.current
    if (!el || !el.children.length) return
    const step = (el.children[1] as HTMLElement | undefined)?.offsetLeft ?? el.scrollWidth
    const card = Math.max(1, step - (el.children[0] as HTMLElement).offsetLeft)
    const visible = Math.max(1, Math.round(el.clientWidth / card))
    const first = Math.min(items.length - visible + 1, Math.round(el.scrollLeft / card) + 1)
    setRange({ first: Math.max(1, first), last: Math.min(items.length, Math.max(1, first) + visible - 1) })
  }, [items.length])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  const go = (dir: 1 | -1) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <div className="ag-tcar" role="group" aria-roledescription="carousel" aria-label={labels.region}>
      <ul className="ag-tcar__track" ref={track} onScroll={measure} tabIndex={0}>
        {items.map(t => (
          <li key={t.id}>
            <figure className="ag-card ag-quote">
              <span className="ag-quote__mark" aria-hidden="true">&ldquo;</span>
              <blockquote>{t.quote}</blockquote>
              <figcaption><b>{t.name}</b><span>{t.byline}</span></figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="ag-tcar__bar">
        <span className="ag-tcar__count" aria-live="polite">{range.first}&ndash;{range.last} / {items.length}</span>
        <div className="ag-tcar__btns">
          <button type="button" onClick={() => go(-1)} disabled={range.first <= 1} aria-label={labels.prev}><ChevronLeft size={20} aria-hidden="true" /></button>
          <button type="button" onClick={() => go(1)} disabled={range.last >= items.length} aria-label={labels.next}><ChevronRight size={20} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  )
}

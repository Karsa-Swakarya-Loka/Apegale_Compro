'use client'
// Home hero slider (reference: unifato "Cargon" home 3). Slides move horizontally every 3 s; on the active slide the
// badge drops in from above, title, text and buttons slide in from the left and the photo from the right. Vertical
// dots sit on the left edge. Additions for WCAG 2.2.2: autoplay pauses on hover/focus, has a pause button, stops
// while the tab is hidden and never starts with reduced motion. Without JS the first slide is simply shown.
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Pause, Play } from 'lucide-react'

type Labels = { label: string; slide: string; pause: string; play: string }
type Props = { slides: ReactNode[]; labels: Labels; interval?: number }

export function HeroSlider({ slides, labels, interval = 3000 }: Props) {
  const count = slides.length
  const [active, setActive] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [dir, setDir] = useState<'next' | 'back'>('next')
  const [ready, setReady] = useState(false)
  const [stopped, setStopped] = useState(false) // pause button
  const [held, setHeld] = useState(false) // hover / focus
  const rootRef = useRef<HTMLElement>(null)

  const go = useCallback((to: number, direction: 'next' | 'back') => {
    if (to === active) return
    setPrev(active)
    setDir(direction)
    setActive(to)
  }, [active])

  // Start the first slide's entrance after hydration, and honour reduced motion.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setStopped(true)
      setReady(true)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    if (count < 2 || stopped || held) return
    const timer = window.setInterval(() => { if (!document.hidden) go((active + 1) % count, 'next') }, interval)
    return () => window.clearInterval(timer)
  }, [active, count, stopped, held, interval, go])

  const state = (i: number) => (i === active ? 'active' : i === prev ? 'prev' : 'idle')

  return (
    <section ref={rootRef} className="ag-hero" aria-roledescription="carousel" aria-label={labels.label} data-dir={dir} data-ready={ready || undefined}
      onPointerEnter={e => { if (e.pointerType === 'mouse') setHeld(true) }} onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)} onBlur={e => { if (!rootRef.current?.contains(e.relatedTarget as Node)) setHeld(false) }}>
      <div className="ag-hero__track" aria-live={stopped || held ? 'polite' : 'off'}>
        {slides.map((slide, i) => (
          <div key={i} className="ag-hero__slide" data-state={state(i)} role="group" aria-roledescription="slide"
            aria-label={labels.slide.replace('{n}', String(i + 1)).replace('{total}', String(count))}
            aria-hidden={i !== active || undefined} inert={i !== active}>
            {slide}
          </div>
        ))}
      </div>
      <svg className="ag-hero__defs" width="0" height="0" aria-hidden="true" focusable="false">
        <clipPath id="ag-hero-clip" clipPathUnits="objectBoundingBox"><path d="M0.42 0 L1 0 L1 0.97 L0.14 0.855 Q0.03 0.84 0.045 0.73 Z" /></clipPath>
        <clipPath id="ag-hero-clip-m" clipPathUnits="objectBoundingBox"><path d="M0 0.2 L1 0 L1 1 L0 1 Z" /></clipPath>
      </svg>
      <svg className="ag-hero__wave" viewBox="0 0 220 300" aria-hidden="true" focusable="false">
        <path d="M70 300 C 40 240, 120 200, 70 150 S -40 80, -60 40" />
        <path d="M110 300 C 90 230, 150 190, 95 140 S -20 60, -50 10" />
      </svg>
      {count > 1 ? (
        <div className="ag-hero__controls">
          <ol className="ag-hero__dots">
            {slides.map((_, i) => (
              <li key={i}>
                <button type="button" aria-current={i === active || undefined}
                  aria-label={labels.slide.replace('{n}', String(i + 1)).replace('{total}', String(count))}
                  onClick={() => go(i, i > active ? 'next' : 'back')} />
              </li>
            ))}
          </ol>
          <button type="button" className="ag-hero__pause" aria-label={stopped ? labels.play : labels.pause} onClick={() => setStopped(s => !s)}>
            {stopped ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
          </button>
        </div>
      ) : null}
    </section>
  )
}

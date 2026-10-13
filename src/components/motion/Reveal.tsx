'use client'
// Reveals a block once when it first enters the viewport (fade + short rise, motion tokens).
// Content stays visible without JavaScript, with reduced motion, and when already on screen at load.
import { useEffect, useRef, type ReactNode } from 'react'

type Props = { children: ReactNode; className?: string; step?: 0 | 1 | 2 }

export function Reveal({ children, className, step = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const onScreen = el.getBoundingClientRect().top < window.innerHeight
    if (reduced || onScreen || !('IntersectionObserver' in window)) { el.dataset.revealed = 'instant'; return }
    el.dataset.reveal = 'pending'
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { el.dataset.revealed = 'true'; io.disconnect() }
    }, { rootMargin: '0px 0px -10% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={['ag-reveal', className].filter(Boolean).join(' ')} data-step={step || undefined}>{children}</div>
}

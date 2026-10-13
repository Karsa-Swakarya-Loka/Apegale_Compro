'use client'
// Wraps topbar + header on every page: the header floats over the page header as a white capsule and, from the first
// pixel of scroll, widens sideways into a full-width bar (reference: unifato "Cargon" home 3).
import { useEffect, useState, type ReactNode } from 'react'

export function Masthead({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 1)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="ag-masthead" data-float="" data-scrolled={scrolled || undefined}>{children}</div>
}

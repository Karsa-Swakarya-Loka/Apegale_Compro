'use client'
// Wraps topbar + header. On every page except the news pages the header floats over the page header as a white capsule
// and, from the first pixel of scroll, widens sideways into a full-width bar (reference: unifato "Cargon" home 3).
// The news pages keep the regular sticky header. `display: contents` keeps that header's sticky containing block intact.
import { useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export function Masthead({ plainPrefix, children }: { plainPrefix: string; children: ReactNode }) {
  const pathname = usePathname()
  const floating = !(pathname === plainPrefix || pathname.startsWith(`${plainPrefix}/`))
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    if (!floating) return
    const onScroll = () => setScrolled(window.scrollY >= 1)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [floating])
  return <div className="ag-masthead" data-float={floating || undefined} data-scrolled={(floating && scrolled) || undefined}>{children}</div>
}

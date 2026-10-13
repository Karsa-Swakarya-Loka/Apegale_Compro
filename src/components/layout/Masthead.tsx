'use client'
// Wraps topbar + header. On the home page the header floats over the hero as a white capsule and, from the first
// pixel of scroll, turns into a full-width fixed bar that slides down (reference: unifato "Cargon" home 3).
// Other pages keep the regular sticky header. `display: contents` keeps the header's sticky containing block intact.
import { useEffect, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

export function Masthead({ homeHref, children }: { homeHref: string; children: ReactNode }) {
  const isHome = usePathname() === homeHref
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setScrolled(window.scrollY >= 1)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])
  return <div className="ag-masthead" data-home={isHome || undefined} data-scrolled={(isHome && scrolled) || undefined}>{children}</div>
}

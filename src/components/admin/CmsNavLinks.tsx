'use client'
// Sidebar links with the current page marked. Also keeps the sidebar open on laptop widths: Payload closes it at 1440px and
// below, which hid the map of the CMS on most laptops; it stays closed only once the reader closes it in this tab.
import { Link, useNav } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { NavIcon } from './NavIcon'
import type { NavLink, NavSection } from './nav'

const CLOSED_KEY = 'cms-nav-closed'
const LAPTOP = '(min-width: 1025px) and (max-width: 1440px)'

function closedByReader() {
  try { return sessionStorage.getItem(CLOSED_KEY) === '1' } catch { return false }
}
function rememberClosed(closed: boolean) {
  try { if (closed) sessionStorage.setItem(CLOSED_KEY, '1'); else sessionStorage.removeItem(CLOSED_KEY) } catch { /* storage blocked: reopen next time */ }
}

function useOpenOnLaptop() {
  const { hydrated, navOpen, setNavOpen } = useNav()
  const open = useRef(navOpen)
  useEffect(() => { open.current = navOpen }, [navOpen])
  // Captured before Payload's own handlers run, so `open` still holds the state the reader is changing.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest?.('.nav-toggler, .nav__mobile-close')) rememberClosed(open.current)
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])
  // Layout effect: reopens before the browser paints the closed state Payload sets after hydration.
  useLayoutEffect(() => {
    if (hydrated && !navOpen && !closedByReader() && window.matchMedia(LAPTOP).matches) setNavOpen(true)
  }, [hydrated, navOpen, setNavOpen])
}

function Item({ link, active }: { link: NavLink; active: boolean }) {
  return (
    <Link className="cms-nav__link" href={link.href} prefetch={false} aria-current={active ? 'page' : undefined} title={link.hint}>
      <NavIcon name={link.icon} />
      <span className="cms-nav__text">{link.label}</span>
      {link.badge ? <span className="cms-nav__badge">{link.badge}<span className="cms-sr"> baru</span></span> : null}
    </Link>
  )
}

export function CmsNavLinks({ home, sections }: { home: string; sections: NavSection[] }) {
  useOpenOnLaptop()
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  return (
    <>
      <Item link={{ href: home, label: 'Dasbor', icon: 'grid' }} active={pathname === home || pathname === `${home}/`} />
      {sections.map(section => (
        <div className="cms-nav__section" key={section.label}>
          <h2 className="cms-nav__label">{section.label}</h2>
          <ul className="cms-nav__list">
            {section.links.map(link => <li key={link.href}><Item link={link} active={isActive(link.href)} /></li>)}
          </ul>
        </div>
      ))}
    </>
  )
}

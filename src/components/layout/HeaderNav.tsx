'use client'
// Desktop dropdown navigation + mobile menu panel for design/components/Header.
// Dropdowns open on hover/focus (pointer devices) and on the chevron button (click/keyboard);
// Escape closes and returns focus. The mobile panel locks page scroll while open.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useId, useRef, useState, type ReactNode } from 'react'
import { navCurrent, navDestination } from '@/lib/navigation'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import { LanguageToggle } from './LanguageToggle'

export type NavItem = { label: string; href: string; children?: NavItem[] }
type Labels = { mainMenu: string; openMenu: string; closeMenu: string; showSubmenu: string; language: string }
type Props = { items: NavItem[]; cta: { label: string; href?: string }; labels: Labels; homeHref: string; brand: ReactNode }

/** Only off-site links (e.g. WhatsApp) open in a new tab. */
const external = (href: string) => (/^https?:/.test(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})

export function HeaderNav({ items, cta, labels, homeHref, brand }: Props) {
  const pathname = usePathname()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null)
  const navRef = useRef<HTMLUListElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const uid = useId()
  const savedOverflow = useRef<string | null>(null)
  const pendingNavigation = useRef<{ from: string; hash: string } | null>(null)

  function unlockScroll() {
    if (savedOverflow.current !== null) {
      document.body.style.overflow = savedOverflow.current
      savedOverflow.current = null
    }
  }

  function closeMenus() {
    setOpenIndex(null); setMobileOpen(false); setMobileExpanded(null)
    unlockScroll()
  }

  function finishNavigation(hash: string) {
    if (hash) {
      let id = hash
      try { id = decodeURIComponent(hash) } catch { /* Keep an undecodable fragment literal. */ }
      const target = document.getElementById(id)
      if (target) {
        target.scrollIntoView({ block: 'start', behavior: 'instant' })
        if (!target.hasAttribute('tabindex')) {
          target.setAttribute('tabindex', '-1')
          target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
        }
        target.focus({ preventScroll: true })
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      document.getElementById('konten')?.focus({ preventScroll: true })
    }
  }

  // onNavigate only runs for a same-tab Next.js navigation, preserving Ctrl/Cmd-click.
  function navigate(href: string) {
    closeMenus()
    const destination = navDestination(href)
    if (destination.pathname === pathname) {
      pendingNavigation.current = null
      requestAnimationFrame(() => finishNavigation(destination.hash))
    } else {
      pendingNavigation.current = { from: pathname, hash: destination.hash }
    }
  }

  useEffect(() => {
    const pending = pendingNavigation.current
    if (!pending || pending.from === pathname) return
    pendingNavigation.current = null
    finishNavigation(pending.hash)
  }, [pathname])

  // A mobile panel must not keep the document locked after resizing to desktop.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1100px)')
    const onChange = () => {
      setOpenIndex(null); setMobileOpen(false); setMobileExpanded(null)
      unlockScroll()
    }
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  // Navigating anywhere closes every menu (state adjusted during render when the URL changes).
  const [shownPath, setShownPath] = useState(pathname)
  if (shownPath !== pathname) {
    setShownPath(pathname); setOpenIndex(null); setMobileOpen(false); setMobileExpanded(null)
  }

  // Desktop: click outside or Escape closes the open dropdown.
  useEffect(() => {
    if (openIndex === null) return
    const onDown = (e: PointerEvent) => { if (!navRef.current?.contains(e.target as Node)) setOpenIndex(null) }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      const toggle = navRef.current?.querySelector<HTMLButtonElement>(`[data-index="${openIndex}"]`)
      setOpenIndex(null)
      toggle?.focus()
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey) }
  }, [openIndex])

  // Mobile: position below the actual header (including the tablet topbar), then lock scroll.
  useLayoutEffect(() => {
    if (!mobileOpen) return
    const positionPanel = () => {
      const panel = panelRef.current
      const header = panel?.closest('header')
      if (panel && header) panel.style.top = header.getBoundingClientRect().bottom + 'px'
    }
    positionPanel()
    window.addEventListener('resize', positionPanel)
    savedOverflow.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a, button')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setMobileOpen(false); setMobileExpanded(null)
        unlockScroll()
        burgerRef.current?.focus()
      }
      if (e.key === 'Tab') {
        const header = panelRef.current?.closest('header')
        const controls = Array.from(header?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
          .filter(element => element.getClientRects().length > 0)
        const first = controls[0], last = controls.at(-1)
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => { unlockScroll(); window.removeEventListener('resize', positionPanel); document.removeEventListener('keydown', onKey) }
  }, [mobileOpen])

  const current = (href: string) => navCurrent(pathname, href, homeHref)

  return (
    <>
      <Link href={homeHref} className="ag-header__brand" aria-label="Ape Gale Indonesia" onNavigate={() => navigate(homeHref)}>{brand}</Link>
      <nav className="ag-nav" aria-label={labels.mainMenu}>
        <ul className="ag-nav__list" ref={navRef}>
          {items.map((item, i) => (
            <li key={item.href} className="ag-nav__item" data-open={openIndex === i || undefined}
              onPointerEnter={e => { if (e.pointerType === 'mouse') setOpenIndex(item.children?.length ? i : null) }}
              onPointerLeave={e => { if (!e.currentTarget.contains(document.activeElement)) setOpenIndex(index => index === i ? null : index) }}
              onFocus={e => { if (!e.currentTarget.contains(e.relatedTarget) && item.children?.length) setOpenIndex(i) }}
              onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setOpenIndex(index => index === i ? null : index) }}>
              <Link href={item.href} onNavigate={() => navigate(item.href)} aria-current={current(item.href)}>{item.label}</Link>
              {item.children?.length ? (
                <>
                  <button type="button" className="ag-nav__toggle" data-index={i}
                    aria-expanded={openIndex === i} aria-controls={`${uid}-sub-${i}`}
                    aria-label={labels.showSubmenu.replace('{label}', item.label)}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                    <ChevronDown size={16} aria-hidden="true" />
                  </button>
                  <ul className="ag-nav__sub" id={`${uid}-sub-${i}`} inert={openIndex !== i}>
                    {item.children.map(child => (
                      <li key={child.href}>
                        <Link href={child.href} onNavigate={() => navigate(child.href)} aria-current={current(child.href)}>{child.label}</Link>
                        {child.children?.length ? (
                          <ul className="ag-nav__sub2">
                            {child.children.map(g => (
                              <li key={g.href} className={g.children?.length ? 'ag-nav__group' : undefined}>
                                <Link href={g.href} onNavigate={() => navigate(g.href)} aria-current={current(g.href)}>
                                  {g.label}{g.children?.length ? <ChevronRight size={14} aria-hidden="true" /> : null}
                                </Link>
                                {g.children?.length ? (
                                  // Flyout: opens beside the parent on hover/focus (CSS), so the list stays one column.
                                  <ul className="ag-nav__fly" aria-label={g.label}>
                                    {g.children.map(v => (
                                      <li key={v.href}><Link href={v.href} onNavigate={() => navigate(v.href)} aria-current={current(v.href)}>{v.label}</Link></li>
                                    ))}
                                  </ul>
                                ) : null}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>

      {cta.href ? <Link className="ag-btn ag-btn--primary ag-btn--sm ag-header__cta" href={cta.href} onNavigate={() => navigate(cta.href!)} {...external(cta.href)}>{cta.label}<span className="ag-btn__chip" aria-hidden="true"><ChevronRight size={16} /></span></Link> : null}

      <LanguageToggle label={labels.language} className="ag-header__lang" />
      <button ref={burgerRef} type="button" className="ag-burger" aria-expanded={mobileOpen}
        aria-controls={`${uid}-panel`} aria-label={mobileOpen ? labels.closeMenu : labels.openMenu}
        onClick={() => { if (mobileOpen) closeMenus(); else setMobileOpen(true) }}>
        {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
      </button>

      <div className="ag-mnav" id={`${uid}-panel`} ref={panelRef} hidden={!mobileOpen}>
        <nav aria-label={labels.mainMenu}>
          <ul className="ag-mnav__list">
            {items.map((item, i) => (
              <li key={item.href}>
                <div className="ag-mnav__row">
                  <Link href={item.href} onNavigate={() => navigate(item.href)} aria-current={current(item.href)}>{item.label}</Link>
                  {item.children?.length ? (
                    <button type="button" className="ag-mnav__toggle" aria-expanded={mobileExpanded === i}
                      aria-controls={`${uid}-msub-${i}`} aria-label={labels.showSubmenu.replace('{label}', item.label)}
                      onClick={() => setMobileExpanded(mobileExpanded === i ? null : i)}>
                      <ChevronDown size={20} aria-hidden="true" />
                    </button>
                  ) : null}
                </div>
                {item.children?.length ? (
                  <ul className="ag-mnav__sub" id={`${uid}-msub-${i}`} hidden={mobileExpanded !== i}>
                    {item.children.flatMap(child => [child, ...(child.children ?? []).flatMap(g => [{ ...g, nested: 1 }, ...(g.children ?? []).map(v => ({ ...v, nested: 2 }))])]).map(child => (
                      <li key={child.href} data-nested={'nested' in child ? child.nested : undefined}>
                        <Link href={child.href} onNavigate={() => navigate(child.href)} aria-current={current(child.href)}>{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          {cta.href ? <Link className="ag-btn ag-btn--primary ag-mnav__cta" href={cta.href} onNavigate={() => navigate(cta.href!)} {...external(cta.href)}>{cta.label}</Link> : null}
        </nav>
      </div>
    </>
  )
}

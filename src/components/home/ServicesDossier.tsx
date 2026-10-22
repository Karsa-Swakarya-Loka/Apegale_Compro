'use client'
// The services register: every service is a filing tab in the index on the right (01–05); the sheet on the left shows
// the chosen one. Choosing a tab moves the thread (CSS, --k) to it at once and swaps the sheet: the open page files
// out, the rail redraws, the next page files in. All pages are rendered and stacked in one grid cell, so the sheet
// keeps the height of its tallest page and nothing jumps; inactive pages are invisible and inert. Tabs pattern
// (WAI-ARIA): arrow keys move between tabs. Links inside the pages lead to the service pages, so nothing is reachable
// only by script.
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { SubService } from '@/components/content/ServiceCard'

export type DossierService = { slug: string; title: string; summary?: string | null; href: string; subServices?: SubService[]; n: string }
type Props = { services: DossierService[]; initial: number; moreLabel: string; label: string }

const OUT_MS = 160

export function ServicesDossier({ services, initial, moreLabel, label }: Props) {
  const [active, setActive] = useState(initial) // page shown in the sheet
  const [selected, setSelected] = useState(initial) // chosen tab: thread and tab state move at once
  const [phase, setPhase] = useState<'idle' | 'out' | 'in'>('idle')
  const timer = useRef<number | undefined>(undefined)
  const folio = useRef<HTMLDivElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const id = useId()
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const select = (i: number) => {
    if (i === selected) return
    setSelected(i)
    window.clearTimeout(timer.current)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) { setActive(i); setPhase('idle') } else {
      setPhase('out')
      timer.current = window.setTimeout(() => { setActive(i); setPhase('in') }, OUT_MS)
    }
    // One-column layouts put the folio above the list: when its head has scrolled under the header (or off screen),
    // bring it back so the chosen service is seen. A folio that is merely cut at the bottom stays where it is.
    const el = folio.current
    if (el) {
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72
      const r = el.getBoundingClientRect()
      if (r.top < header || r.top > window.innerHeight - 160) el.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' })
    }
  }

  const onKey = (e: KeyboardEvent<HTMLOListElement>) => {
    const keys: Record<string, number> = { ArrowDown: selected + 1, ArrowRight: selected + 1, ArrowUp: selected - 1, ArrowLeft: selected - 1, Home: 0, End: services.length - 1 }
    const next = keys[e.key]
    if (next === undefined) return
    e.preventDefault()
    const i = (next + services.length) % services.length
    tabs.current[i]?.focus()
    select(i)
  }

  return (
    <>
      <div ref={folio} className="ag-folio" data-phase={phase === 'idle' ? undefined : phase}>
        {services.map((s, i) => {
          const on = i === active
          return (
            <div
              key={s.slug} className="ag-folio__panel" role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`}
              aria-hidden={!on} inert={!on} data-active={on || undefined}
            >
              <span className="ag-folio__tab" aria-hidden="true"><span>{s.n}</span></span>
              <h3><Link href={s.href}>{s.title}</Link></h3>
              {s.summary ? <p>{s.summary}</p> : null}
              {s.subServices?.length ? (
                <ol className="ag-folio__tree">
                  {s.subServices.map((sub, j) => (
                    <li key={sub.href} style={{ '--i': j + 1 } as React.CSSProperties}>
                      <Link href={sub.href}>{sub.label}</Link>
                      {sub.children?.length ? (
                        <ol>
                          {sub.children.map((c, k) => (
                            <li key={c.href} style={{ '--i': j + 2 + k } as React.CSSProperties}><Link href={c.href}>{c.label}</Link></li>
                          ))}
                        </ol>
                      ) : null}
                    </li>
                  ))}
                </ol>
              ) : null}
              <Link className="ag-folio__more" href={s.href}>{moreLabel}<ArrowRight size={16} aria-hidden="true" /></Link>
            </div>
          )
        })}
      </div>

      <ol className="ag-ledger__list" role="tablist" aria-label={label} aria-orientation="vertical" onKeyDown={onKey}
        style={{ '--k': selected, '--n': services.length } as React.CSSProperties}>
        {services.map((s, i) => (
          <li key={s.slug} role="presentation">
            <button
              type="button" role="tab" id={`${id}-tab-${i}`} aria-selected={i === selected} aria-controls={`${id}-panel-${i}`} tabIndex={i === selected ? 0 : -1}
              className="ag-ledger__row" style={{ '--i': i } as React.CSSProperties}
              ref={el => { tabs.current[i] = el }} onClick={() => select(i)}
            >
              <span className="ag-ledger__tab" aria-hidden="true"><span>{s.n}</span></span>
              <span className="ag-ledger__title">{s.title}</span>
            </button>
          </li>
        ))}
      </ol>
    </>
  )
}

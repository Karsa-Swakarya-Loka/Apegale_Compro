'use client'
// Interactive network map: pointing at (or focusing) a city in the list lifts its dot on the map, pulses it and shows
// its name; pointing at a dot lights up the matching list item. Click/tap pins a city so it also works on touch
// screens. Dots drop in one by one when the map scrolls into view. With reduced motion the highlight stays, the
// movement goes (motion.css).
import { useRef, useState } from 'react'
import { Reveal } from '@/components/motion/Reveal'

type City = { name: string; x: number; y: number }
type Props = { cities: City[]; width: number; height: number; label: string }

export function NetworkExplorer({ cities, width, height, label }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)
  const [pinned, setPinned] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const current = hovered ?? pinned

  function pin(name: string) {
    setPinned(p => (p === name ? null : name))
    // On narrow screens the list sits under the map: bring the map back into view so the pinned city is visible.
    const box = canvasRef.current?.getBoundingClientRect()
    if (box && (box.top < 0 || box.bottom > window.innerHeight)) canvasRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }

  return (
    <>
      <Reveal step={1} className="ag-impact__tile ag-impact__tile--map">
        <div ref={canvasRef} className="ag-network__canvas" data-has-active={current ? '' : undefined}>
          <span className="ag-network__land" aria-hidden="true" />
          <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="network-map-title">
            <title id="network-map-title">{`${label}: ${cities.map(c => c.name).join(', ')}`}</title>
            {cities.map((c, i) => (
              <g key={c.name} className="ag-network__city" data-active={c.name === current || undefined} transform={`translate(${c.x.toFixed(1)} ${c.y.toFixed(1)})`}
                style={{ ['--i' as string]: i }} onPointerEnter={() => setHovered(c.name)} onPointerLeave={() => setHovered(null)} onClick={() => pin(c.name)}>
                <g className="ag-network__mark">
                  <circle r="26" className="ag-network__hit" />
                  <circle r="14" className="ag-network__pulse" />
                  <circle r="14" className="ag-network__halo" />
                  <circle r="6" className="ag-network__dot" />
                </g>
              </g>
            ))}
          </svg>
          {cities.map(c => {
            const left = (c.x / width) * 100
            return (
              <span key={c.name} className="ag-network__label" aria-hidden="true" data-active={c.name === current || undefined}
                data-edge={left > 82 ? 'end' : left < 14 ? 'start' : undefined} style={{ left: `${left}%`, top: `${(c.y / height) * 100}%` }}>
                {c.name}
              </span>
            )
          })}
        </div>
      </Reveal>
      <Reveal step={2} className="ag-impact__tile ag-impact__tile--cities ag-dark">
        <p className="ag-eyebrow">{label}</p>
        <ul className="ag-impact__cities" aria-label={label}>
          {cities.map(c => (
            <li key={c.name}>
              <button type="button" aria-pressed={pinned === c.name} data-active={c.name === current || undefined}
                onPointerEnter={() => setHovered(c.name)} onPointerLeave={() => setHovered(null)}
                onFocus={() => setHovered(c.name)} onBlur={() => setHovered(null)} onClick={() => pin(c.name)}>
                {c.name}
              </button>
            </li>
          ))}
        </ul>
        <span className="ag-wedge" aria-hidden="true" />
      </Reveal>
    </>
  )
}

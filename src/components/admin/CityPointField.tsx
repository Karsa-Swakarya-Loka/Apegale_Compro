'use client'
// CMS map picker for a city pin: no coordinates to type. Typing a known city name in the sibling "name" field fills
// the point automatically; a search box offers the built-in city list; clicking the map sets or adjusts the point.
// Writes the sibling `lat` / `lng` fields (hidden in the form). Map geometry comes from clientProps so the same
// component serves both sites' projections.
import { useEffect, useId, useRef } from 'react'
import { useField } from '@payloadcms/ui'
import { CITIES, findCity, nearestCity } from './cities-id'

type Geo = { width: number; height: number; minLon: number; maxLat: number; scale: number; padLeft?: number; padTop?: number; svg: string }
type Props = { path: string; geo?: Geo }

const round = (n: number) => Math.round(n * 1000) / 1000

export function CityPointField({ path, geo }: Props) {
  const base = path.includes('.') ? path.slice(0, path.lastIndexOf('.') + 1) : ''
  const name = useField<string>({ path: `${base}name` })
  const lat = useField<number | null>({ path: `${base}lat` })
  const lng = useField<number | null>({ path: `${base}lng` })
  const listId = useId()
  // Name when the form opened: an existing point is only moved when the name changes to another known city.
  const initialName = useRef(name.value)
  const g = geo!
  const padL = g.padLeft ?? 0, padT = g.padTop ?? 0

  const set = (la: number, ln: number) => { lat.setValue(round(la)); lng.setValue(round(ln)) }
  const hasPoint = typeof lat.value === 'number' && typeof lng.value === 'number'
  const match = findCity(name.value)

  // Typing a known city fills the point when there is none yet, or when the name changed to a different city.
  useEffect(() => {
    if (!match) return
    if (!hasPoint || findCity(initialName.current)?.name !== match.name) set(match.lat, match.lng)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match?.name])

  const onMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * g.width, y = ((e.clientY - r.top) / r.height) * g.height
    set(g.maxLat - (y - padT) / g.scale, g.minLon + (x - padL) / g.scale)
  }
  const onPick = (value: string) => {
    const c = findCity(value)
    if (!c) return
    set(c.lat, c.lng)
    if (!name.value) name.setValue(c.name)
  }

  const pt = hasPoint ? { x: padL + ((lng.value as number) - g.minLon) * g.scale, y: padT + (g.maxLat - (lat.value as number)) * g.scale } : null
  const near = hasPoint ? nearestCity(lat.value as number, lng.value as number) : null

  return (
    <div className="cms-mappick">
      <div className="cms-mappick__head">
        <span className="cms-mappick__title">Titik di peta</span>
        <span className="cms-mappick__hint">Ketik nama kota di kolom <b>Nama kota</b>, titik terisi otomatis. Atau cari di bawah, atau klik langsung di peta.</span>
      </div>
      <div className="cms-mappick__search">
        <input list={listId} placeholder="Cari kota, mis. Surabaya" aria-label="Cari kota"
          onChange={e => onPick(e.currentTarget.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onPick(e.currentTarget.value) } }} />
        <datalist id={listId}>{CITIES.map(c => <option key={c.name} value={c.name} />)}</datalist>
        {match && hasPoint && (Math.abs(match.lat - (lat.value as number)) > 0.05 || Math.abs(match.lng - (lng.value as number)) > 0.05) ? (
          <button type="button" className="cms-mappick__reset" onClick={() => set(match.lat, match.lng)}>Kembalikan ke titik {match.name}</button>
        ) : null}
      </div>
      <div className="cms-mappick__map" style={{ aspectRatio: `${g.width} / ${g.height}` }}>
        <span className="cms-mappick__land" style={{ WebkitMaskImage: `url(${g.svg})`, maskImage: `url(${g.svg})` }} aria-hidden="true" />
        <svg viewBox={`0 0 ${g.width} ${g.height}`} onClick={onMapClick} role="img" aria-label="Peta Indonesia, klik untuk menaruh titik">
          {pt ? <g transform={`translate(${pt.x} ${pt.y})`}><circle r="16" className="cms-mappick__halo" /><circle r="7" className="cms-mappick__dot" /></g> : null}
        </svg>
      </div>
      <p className={`cms-mappick__status${hasPoint ? '' : ' cms-mappick__status--empty'}`}>
        {hasPoint ? <>Titik sudah dipasang{near ? <> di sekitar <b>{near.name}</b></> : null}.</> : 'Belum ada titik. Ketik nama kota atau klik peta.'}
      </p>
    </div>
  )
}

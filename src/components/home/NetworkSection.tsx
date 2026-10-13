import { INDONESIA_MAP, project } from '@/lib/indonesia-map'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

type City = { name: string; lat?: number | null; lng?: number | null }
type Props = {
  title: string; text?: string | null; cities: City[]; citiesLabel: string
  stats?: { value: string; label: string }[]; stat?: { value: string; label: string }; tone?: 'brand' | 'soft'
}

/** Template slide 04 "Impact in numbers": a grey figures tile, the map tile in the middle, a red tile listing the cities.
 *  The outline is a static file used as a CSS mask (public/brand/indonesia-land.svg). */
export function NetworkSection({ title, text, cities, citiesLabel, stats = [], stat, tone = 'brand' }: Props) {
  const placed = cities.filter((c): c is City & { lat: number; lng: number } => typeof c.lat === 'number' && typeof c.lng === 'number')
  const figures = stats.length ? stats : stat ? [stat] : []
  return (
    <section className={`ag-section ag-section--${tone} ag-impact-section`} aria-labelledby="network-title">
      <div className="ag-container ag-stack">
        <Reveal><SectionHeading id="network-title" title={title} intro={text} /></Reveal>
        <div className={`ag-impact${figures.length ? '' : ' ag-impact--duo'}`}>
          {figures.length ? (
            <Reveal className="ag-impact__tile ag-impact__tile--grey">
              <dl className="ag-impact__figures">
                {figures.map(f => <div key={f.value + f.label}><dt>{f.value}</dt><dd>{f.label}</dd></div>)}
              </dl>
            </Reveal>
          ) : null}
          <Reveal step={1} className="ag-impact__tile ag-impact__tile--map">
            <div className="ag-network__canvas">
              <span className="ag-network__land" aria-hidden="true" />
              <svg viewBox={`0 0 ${INDONESIA_MAP.width} ${INDONESIA_MAP.height}`} role="img" aria-labelledby="network-map-title">
                <title id="network-map-title">{`${citiesLabel}: ${placed.map(c => c.name).join(', ')}`}</title>
                {placed.map(c => {
                  const { x, y } = project(c.lat, c.lng)
                  return (
                    <g key={c.name} className="ag-network__city" transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}>
                      <circle r="14" className="ag-network__halo" />
                      <circle r="6" className="ag-network__dot" />
                    </g>
                  )
                })}
              </svg>
            </div>
          </Reveal>
          <Reveal step={2} className="ag-impact__tile ag-impact__tile--red">
            <p className="ag-impact__label">{citiesLabel}</p>
            <ul className="ag-impact__cities" aria-label={citiesLabel}>
              {placed.map(c => <li key={c.name}>{c.name}</li>)}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

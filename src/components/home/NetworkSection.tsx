import { INDONESIA_MAP, project } from '@/lib/indonesia-map'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { NetworkExplorer } from './NetworkExplorer'

type City = { name: string; lat?: number | null; lng?: number | null }
type Props = {
  title: string; text?: string | null; cities: City[]; citiesLabel: string
  stats?: { value: string; label: string }[]; stat?: { value: string; label: string }; tone?: 'soft' | 'plain'
}

/** Template slide 05 "Performance at a glance": title and intro, then a white map card and a charcoal card listing
 *  the cities (optional figures card first); the two are linked interactively by NetworkExplorer.
 *  The outline is a static file used as a CSS mask (public/brand/indonesia-land.svg). */
export function NetworkSection({ title, text, cities, citiesLabel, stats = [], stat, tone = 'soft' }: Props) {
  const placed = cities.filter((c): c is City & { lat: number; lng: number } => typeof c.lat === 'number' && typeof c.lng === 'number')
  const figures = stats.length ? stats : stat ? [stat] : []
  return (
    <section className={`ag-section${tone === 'soft' ? ' ag-section--soft' : ''}`} aria-labelledby="network-title">
      <div className="ag-container ag-stack">
        <Reveal><SectionHeading id="network-title" title={title} intro={text} /></Reveal>
        <div className={`ag-impact${figures.length ? '' : ' ag-impact--duo'}`}>
          {figures.length ? (
            <Reveal className="ag-impact__tile ag-impact__tile--figures">
              <dl className="ag-impact__figures">
                {figures.map(f => <div key={f.value + f.label}><dt>{f.value}</dt><dd>{f.label}</dd></div>)}
              </dl>
            </Reveal>
          ) : null}
          <NetworkExplorer label={citiesLabel} width={INDONESIA_MAP.width} height={INDONESIA_MAP.height}
            cities={placed.map(c => ({ name: c.name, ...project(c.lat, c.lng) }))} />
        </div>
      </div>
    </section>
  )
}

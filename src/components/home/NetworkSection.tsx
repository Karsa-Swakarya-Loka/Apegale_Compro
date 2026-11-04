import { Globe, Handshake, MapPin, Users, type LucideIcon } from 'lucide-react'
import { INDONESIA_MAP, project } from '@/lib/indonesia-map'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { NetworkExplorer } from './NetworkExplorer'

const pillarIcons: Record<string, LucideIcon> = { 'map-pin': MapPin, globe: Globe, handshake: Handshake, users: Users }
type Pillar = { icon: string; title: string; text: string }
type City = { name: string; lat?: number | null; lng?: number | null }
type Props = {
  index?: string; title: string; text?: string | null; cities: City[]; citiesLabel: string
  pillars?: readonly Pillar[]; eyebrow?: string; stats?: { value: string; label: string }[]; stat?: { value: string; label: string }; tone?: 'soft' | 'plain'
}

/** Network (design v10): title and intro, then the map in the red gradient beside the city index; the two are
 *  linked interactively by NetworkExplorer (optional figures first).
 *  The outline is a static file used as a CSS mask (public/brand/indonesia-land.svg). */
export function NetworkSection({ index, eyebrow, title, text, cities, citiesLabel, pillars = [], stats = [], stat, tone = 'soft' }: Props) {
  const placed = cities.filter((c): c is City & { lat: number; lng: number } => typeof c.lat === 'number' && typeof c.lng === 'number')
  const figures = stats.length ? stats : stat ? [stat] : []
  return (
    <section className={`ag-section${tone === 'soft' ? ' ag-section--soft' : ''}`} aria-labelledby="network-title">
      <div className="ag-container ag-stack">
        <Reveal><SectionHeading index={index} id="network-title" eyebrow={eyebrow} title={title} intro={text} /></Reveal>
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
        {pillars.length ? (
          <ul className="ag-pillars">
            {pillars.map((p, i) => {
              const Glyph = pillarIcons[p.icon] ?? MapPin
              return (
                <li key={p.title}><Reveal step={(i % 3) as 0 | 1 | 2} className="ag-pillar">
                  <span className="ag-pillar__icon"><Glyph size={22} aria-hidden="true" /></span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </Reveal></li>
              )
            })}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import type { Media } from '@/payload-types'
import { Button } from '@/components/ui/Button'
import { HeroSlider } from './HeroSlider'

type Cta = { label: string; href?: string }
type Slide = { eyebrow?: string | null; title: string; highlight?: string | null; text?: string | null; primary: Cta; secondary?: Cta }
type Props = Slide & {
  image?: Media | null
  /** Further slides after the main message (real CMS content only, e.g. the first services). */
  more?: Slide[]
  labels: { label: string; slide: string; pause: string; play: string }
}

/** Home hero (reference: unifato "Cargon" home 3): a light field under the floating capsule header, copy on the left
 *  (badge, title, text, two pill buttons with arrow chips), the photo on the right inside a slanted, rounded panel,
 *  a red wave line at the bottom left. The first slide carries the CMS hero and the page's only h1. */
export function Hero({ image, more = [], labels, ...main }: Props) {
  const photo = image?.sizes?.hero?.url ? image.sizes.hero : image
  const media = photo?.url && photo.width && photo.height ? (
    <div className="ag-hero__media" aria-hidden="true">
      <div className="ag-hero__photo">
        <Image src={photo.url} alt="" fill loading="eager" fetchPriority="high" sizes="(max-width: 1023px) 100vw, 52vw" />
      </div>
    </div>
  ) : null
  const slides = [main, ...more].map((s, i) => {
    const Tag = i === 0 ? 'h1' : 'h2'
    const at = s.highlight ? s.title.indexOf(s.highlight) : -1
    const title = at < 0 || !s.highlight ? s.title : <>{s.title.slice(0, at)}<em>{s.highlight}</em>{s.title.slice(at + s.highlight.length)}</>
    const chip = <span className="ag-btn__chip" aria-hidden="true"><ChevronRight size={16} /></span>
    return (
      <div className="ag-hero__in" key={i}>
        {media}
        <div className="ag-hero__copy">
          {s.eyebrow ? <span className="ag-hero__badge">{s.eyebrow}</span> : null}
          <Tag className="ag-hero__title">{title}</Tag>
          {s.text ? <p className="ag-hero__lead">{s.text}</p> : null}
          <div className="ag-hero__cta">
            {s.primary.href ? <Button href={s.primary.href} label={s.primary.label} icon={chip} /> : null}
            {s.secondary?.href ? <Button variant="outline" href={s.secondary.href} label={s.secondary.label} icon={chip} /> : null}
          </div>
        </div>
      </div>
    )
  })
  return <HeroSlider slides={slides} labels={labels} />
}

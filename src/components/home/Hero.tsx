import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Media } from '@/payload-types'
import { Button } from '@/components/ui/Button'
import { StatBadge } from '@/components/content/StatBadge'

type Cta = { label: string; href?: string }
type Props = {
  eyebrow?: string | null; headline: string; highlight?: string | null; lead?: string | null
  image?: Media | null; primary: Cta; secondary: Cta; stats: { value: string; label: string }[]
}

/** Hero (design v10): oversized title on white, the photo on the right cut by the red-gradient slash that is the
 *  site's signature mark. Text first on mobile. */
export function Hero({ eyebrow, headline, highlight, lead, image, primary, secondary, stats }: Props) {
  const at = highlight ? headline.indexOf(highlight) : -1
  const title = at < 0 || !highlight ? headline : <>{headline.slice(0, at)}<em>{highlight}</em>{headline.slice(at + highlight.length)}</>
  const photo = image?.sizes?.hero?.url ? image.sizes.hero : image
  return (
    <section className="ag-hero">
      <div className="ag-hero__in">
        <div className="ag-hero__copy">
          {eyebrow ? <span className="ag-eyebrow">{eyebrow}</span> : null}
          <h1>{title}</h1>
          {lead ? <p className="ag-hero__lead">{lead}</p> : null}
          <div className="ag-row ag-hero__cta">
            {primary.href ? <Button href={primary.href} label={primary.label} icon={<ArrowRight size={18} aria-hidden="true" />} /> : null}
            {secondary.href ? <Button variant="outline" href={secondary.href} label={secondary.label} /> : null}
          </div>
          <StatBadge items={stats} />
        </div>
      </div>
      {photo?.url && photo.width && photo.height ? (
        <div className="ag-hero__media">
          <Image src={photo.url} alt={image?.alt || ''} fill loading="eager" fetchPriority="high" sizes="(max-width: 1023px) 100vw, 52vw" />
          <span className="ag-hero__stripe" aria-hidden="true" />
        </div>
      ) : null}
      <span className="ag-wedge" aria-hidden="true" />
    </section>
  )
}

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Media } from '@/payload-types'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

type Props = {
  eyebrow?: string | null; title: string; highlight?: string; text?: string | null
  founder: { name?: string | null; role?: string | null; photo?: Media | null; quote?: string | null }
  more: { label: string; href: string }
}

/** Template slide 02 "Who we are": copy on the left; the founder on a charcoal panel cut on the diagonal with a maroon
 *  corner wedge, his name and role on a white card over the panel's lower edge. Approved content only. */
export function AboutSection({ eyebrow, title, highlight, text, founder, more }: Props) {
  const photo = founder.photo?.url && founder.photo.width && founder.photo.height ? founder.photo : null
  return (
    <section className="ag-section" aria-labelledby="about-title">
      <div className="ag-container ag-story">
        <Reveal className="ag-story__copy">
          <SectionHeading id="about-title" eyebrow={eyebrow} title={title} highlight={highlight} />
          {text ? <p className="ag-about__text">{text}</p> : null}
          {founder.quote ? <blockquote className="ag-about__quote">{founder.quote}</blockquote> : null}
          <Button variant="outline" href={more.href} label={more.label} icon={<ArrowRight size={18} aria-hidden="true" />} />
        </Reveal>
        <Reveal step={1} className="ag-story__media">
          <div className="ag-story__panel">
            {photo ? <Image src={photo.url!} alt={photo.alt || founder.name || ''} fill sizes="(max-width: 1023px) 90vw, 520px" /> : null}
            <span className="ag-wedge" aria-hidden="true" />
          </div>
          {founder.name ? (
            <div className="ag-story__card">
              <b>{founder.name}</b>
              {founder.role ? <span>{founder.role}</span> : null}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}

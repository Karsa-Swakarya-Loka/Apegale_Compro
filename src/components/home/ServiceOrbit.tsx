import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

type Service = { slug: string; title: string; summary?: string | null; icon?: string | null; href: string }
type Props = { title: string; highlight?: string; intro?: string | null; services: Service[]; photo?: Media | null; mark?: string }

/** Template slide 03 "Our solution": heading left, a round photo inside a ring, the services listed along the ring's arc. */
export function ServiceOrbit({ title, highlight, intro, services, photo }: Props) {
  const img = photo?.sizes?.card?.url ? photo.sizes.card : photo
  return (
    <section className="ag-section" aria-labelledby="services-title">
      <div className={`ag-container ag-orbit${img?.url ? '' : ' ag-orbit--text'}`}>
        <Reveal className="ag-orbit__head">
          <SectionHeading id="services-title" title={title} highlight={highlight} intro={intro} />
        </Reveal>
        {img?.url ? <div className="ag-orbit__ring" aria-hidden="true">
          <div className="ag-orbit__disc">
            <Image src={img.url} alt="" fill sizes="(max-width: 1023px) 60vw, 320px" />
          </div>
          <span className="ag-orbit__badge"><Image src="/brand/apegale-mark.png" alt="" width={40} height={40} /></span>
          <span className="ag-orbit__dot" />
        </div> : null}
        <ul className="ag-orbit__list">
          {services.map((s, i) => (
            <li key={s.slug} style={{ ['--i' as string]: i, ['--n' as string]: services.length }}>
              <Reveal step={(i % 3) as 0 | 1 | 2} className="ag-orbit__item">
                <span className="ag-orbit__icon"><Icon name={s.icon} size={22} /></span>
                <span>
                  <Link href={s.href} className="ag-orbit__link">{s.title}</Link>
                  {s.summary ? <span className="ag-orbit__text">{s.summary}</span> : null}
                </span>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

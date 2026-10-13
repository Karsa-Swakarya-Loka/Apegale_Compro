import Image from 'next/image'
import { ArrowRight, ClipboardCheck, PlaneLanding, UserCog } from 'lucide-react'
import type { Garis } from '@/payload-types'
import { asMedia } from '@/lib/cms'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/BrandIcons'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

type Props = {
  garis: Garis; title: string; intro?: string | null; labels: { login: string; trial: string; comingSoon: string; ask: string }
  whatsapp?: string; id?: string; more?: { label: string; href: string }
}

const moduleIcons = [ClipboardCheck, PlaneLanding, UserCog]

/** Template slide 09 "Modular solutions": copy and actions on the left, the GARIS modules as square tiles
 *  (first one red) with the product screenshot beneath. Login/trial stay disabled until enabled in the CMS. */
export function GarisSection({ garis, title, intro, labels, whatsapp, id, more }: Props) {
  const live = Boolean(garis.enabled)
  const action = (label: string, url?: string | null) =>
    live && url ? <Button href={url} label={label} /> : <Button disabled label={`${label} · ${labels.comingSoon}`} />
  const shot = (garis.gallery ?? []).map(g => asMedia(g.image)).find(m => m?.url && m.width && m.height)
  return (
    <section className="ag-section" id={id} aria-labelledby="garis-title">
      <div className="ag-container ag-modular">
        <Reveal className="ag-modular__copy">
          <SectionHeading id="garis-title" title={title} intro={intro ?? garis.intro} />
          <div className="ag-row">
            {action(labels.login, garis.loginUrl)}
            {action(labels.trial, garis.trialUrl)}
          </div>
          <div className="ag-row">
            {whatsapp ? <Button variant="wa" href={whatsapp} label={labels.ask} icon={<WhatsAppIcon size={20} />} /> : null}
            {more ? <Button variant="ghost" href={more.href} label={more.label} icon={<ArrowRight size={18} aria-hidden="true" />} /> : null}
          </div>
        </Reveal>
        <Reveal step={1} className="ag-modular__grid">
          {(garis.variants ?? []).map((v, i) => {
            const Glyph = moduleIcons[i % moduleIcons.length]
            return (
              <div key={v.name} className={`ag-tile${i === 0 ? ' ag-tile--red' : ''}`}>
                <Glyph size={26} aria-hidden="true" />
                <b>{v.name}</b>
              </div>
            )
          })}
          {shot ? (
            <div className="ag-tile ag-tile--shot">
              <Image src={shot.url!} alt={shot.alt || ''} width={shot.width!} height={shot.height!} sizes="(max-width: 767px) 100vw, 40vw" />
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}

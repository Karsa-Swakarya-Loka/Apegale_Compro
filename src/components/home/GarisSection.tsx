import Image from 'next/image'
import { ArrowRight, CircleCheck } from 'lucide-react'
import type { Garis } from '@/payload-types'
import { asMedia } from '@/lib/cms'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/BrandIcons'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'

type Props = {
  garis: Garis; title: string; highlight?: string; intro?: string | null; labels: { login: string; trial: string; comingSoon: string; ask: string }
  whatsapp?: string; id?: string; more?: { label: string; href: string }
}

/** Template slide 06 "Case study highlight": copy, the GARIS modules as a checklist and the actions on the left; the
 *  product screenshot over a maroon diagonal plane on the right. Login/trial stay a quiet "coming soon" line after the
 *  live actions until the CMS enables them. */
export function GarisSection({ garis, title, highlight, intro, labels, whatsapp, id, more }: Props) {
  const live = Boolean(garis.enabled)
  const shot = (garis.gallery ?? []).map(g => asMedia(g.image)).find(m => m?.url && m.width && m.height)
  const modules = (garis.variants ?? []).filter(v => v.name)
  const app = [{ label: labels.login, url: garis.loginUrl }, { label: labels.trial, url: garis.trialUrl }]
  return (
    <section className="ag-section" id={id} aria-labelledby="garis-title">
      <div className="ag-container ag-showcase">
        <Reveal className="ag-showcase__copy">
          <SectionHeading id="garis-title" eyebrow="GARIS" title={title} highlight={highlight} intro={intro ?? garis.intro} />
          {modules.length ? (
            <ul className="ag-checklist">
              {modules.map(v => <li key={v.name}><CircleCheck size={22} aria-hidden="true" /><b>{v.name}</b></li>)}
            </ul>
          ) : null}
          <div className="ag-row">
            {whatsapp ? <Button variant="wa" href={whatsapp} label={labels.ask} icon={<WhatsAppIcon size={20} />} /> : null}
            {more ? <Button variant="ghost" href={more.href} label={more.label} icon={<ArrowRight size={18} aria-hidden="true" />} /> : null}
          </div>
          <div className="ag-row ag-row--quiet">
            {app.map(a => live && a.url
              ? <Button key={a.label} variant="outline" size="sm" href={a.url} label={a.label} />
              : <Button key={a.label} size="sm" disabled label={`${a.label} · ${labels.comingSoon}`} />)}
          </div>
        </Reveal>
        <Reveal step={1} className="ag-showcase__media">
          <span className="ag-showcase__plane" aria-hidden="true" />
          {shot ? (
            <div className="ag-showcase__shot">
              <Image src={shot.url!} alt={shot.alt || ''} width={shot.width!} height={shot.height!} sizes="(max-width: 1023px) 100vw, 50vw" />
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}

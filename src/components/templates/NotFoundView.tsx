import { ArrowRight } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { href } from '@/i18n/routes'
import { getSite, getUi } from '@/lib/cms'
import { whatsappHref } from '@/lib/whatsapp'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/BrandIcons'

/** Bilingual 404 with a way forward: services and WhatsApp. */
export async function NotFoundView({ locale }: { locale: Locale }) {
  const [site, ui] = await Promise.all([getSite(locale), getUi(locale)])
  const m = getMessages(locale)
  const wa = whatsappHref(site.whatsapp, site.whatsappDefaultMessage)
  return (
    <section className="ag-section ag-notfound">
      <div className="ag-container ag-sechead">
        <span className="ag-eyebrow">404</span>
        <h1>{m.notFound.title}</h1>
        <p>{m.notFound.text}</p>
        <div className="ag-row">
          <Button href={href(locale, 'services')} label={ui.cta?.viewServices || ''} icon={<ArrowRight size={18} aria-hidden="true" />} />
          {wa ? <Button variant="outline" href={wa} label={ui.cta?.askWhatsapp || ''} icon={<WhatsAppIcon size={18} />} /> : null}
        </div>
      </div>
    </section>
  )
}

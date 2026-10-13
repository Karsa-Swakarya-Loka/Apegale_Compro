// /hubungi-kami · /en/contact — contact details + full inquiry form + short FAQ. No CTA banner (docs/02).
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { Mail, MapPin, Phone } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { href } from '@/i18n/routes'
import { getFaqs, getSite, getTopServices, getUi } from '@/lib/cms'
import { telHref, whatsappHref } from '@/lib/whatsapp'
import { PageHeader } from '@/components/content/PageHeader'
import { FAQList } from '@/components/content/FAQ'
import { ContactForm } from '@/components/forms/ContactForm'
import { formLabels } from '@/components/forms/labels'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { InstagramIcon, WhatsAppIcon } from '@/components/ui/BrandIcons'
import { formatWhatsApp } from '@/components/layout/Header'

export async function contactMetadata(locale: Locale): Promise<Metadata> {
  const ui = await getUi(locale)
  const m = getMessages(locale)
  return pageMetadata({ locale, route: 'contact', title: ui.pages?.contact?.seo?.title || m.contact.title,
    description: ui.pages?.contact?.seo?.description || ui.pages?.contact?.intro || m.contact.intro, image: ui.pages?.contact?.seo?.ogImage })
}

export async function ContactPage({ locale }: { locale: Locale }) {
  const [ui, site, services, faqs] = await Promise.all([getUi(locale), getSite(locale), getTopServices(locale), getFaqs(locale, { category: 'umum' })])
  const m = getMessages(locale)
  const wa = whatsappHref(site.whatsapp, site.whatsappDefaultMessage)
  const instagram = site.social?.find(s => s.platform === 'instagram')
  const options = services.flatMap(s => [{ value: s.slug, label: s.title }, ...s.children.map(c => ({ value: c.slug, label: `— ${c.title}` }))])

  return (
    <>
      <PageHeader title={m.contact.title} intro={ui.pages?.contact?.intro || m.contact.intro} crumbLabel={m.services.breadcrumb}
        crumbs={[{ label: ui.nav?.home || 'Home', href: href(locale, 'home') }, { label: ui.nav?.contact || '' }]} />

      <section className="ag-section">
        <div className="ag-container ag-contact">
          <aside className="ag-contact__info" aria-labelledby="contact-info-title">
            <h2 id="contact-info-title" className="ag-contact__title">{m.contact.infoTitle}</h2>
            <ul className="ag-contact__list">
              {site.address ? (
                <li><span className="ag-contact__icon"><MapPin size={20} aria-hidden="true" /></span>
                  <div><b>{m.contact.address}</b><address>{site.address}</address>
                    {site.mapsUrl ? <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">{m.contact.openMaps}</a> : null}</div></li>
              ) : null}
              {site.phone ? (
                <li><span className="ag-contact__icon"><Phone size={20} aria-hidden="true" /></span>
                  <div><b>{m.contact.phone}</b><a href={telHref(site.phone)}>{site.phone}</a></div></li>
              ) : null}
              {wa ? (
                <li><span className="ag-contact__icon"><WhatsAppIcon size={20} /></span>
                  <div><b>WhatsApp</b><a href={wa} target="_blank" rel="noopener noreferrer">{formatWhatsApp(site.whatsapp)}</a></div></li>
              ) : null}
              {site.email ? (
                <li><span className="ag-contact__icon"><Mail size={20} aria-hidden="true" /></span>
                  <div><b>Email</b><a href={`mailto:${site.email}`}>{site.email}</a></div></li>
              ) : null}
              {instagram ? (
                <li><span className="ag-contact__icon"><InstagramIcon size={20} /></span>
                  <div><b>Instagram</b><a href={instagram.url} target="_blank" rel="noopener noreferrer">@{instagram.url.replace(/\/+$/, '').split('/').pop()}</a></div></li>
              ) : null}
            </ul>
            {wa ? <Button variant="wa" href={wa} label={ui.cta?.whatsapp || ''} icon={<WhatsAppIcon size={20} />} /> : null}
          </aside>
          <div className="ag-contact__form">
            <ContactForm variant="full" locale={locale} idPrefix="contact" services={options} labels={formLabels(ui, m, m.contact.formTitle)} />
          </div>
        </div>
      </section>

      {faqs.length ? (
        <section className="ag-section ag-section--soft" aria-labelledby="contact-faq-title">
          <div className="ag-container ag-split">
            <SectionHeading id="contact-faq-title" title={m.contact.faqTitle} />
            <FAQList items={faqs} />
          </div>
        </section>
      ) : null}
    </>
  )
}

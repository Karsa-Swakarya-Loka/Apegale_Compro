// /layanan · /en/services — page header, six services, featured price list, service FAQs, CTA.
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { href } from '@/i18n/routes'
import { getFaqs, getFeaturedPrices, getSite, getTopServices, getUi } from '@/lib/cms'
import { whatsappHref } from '@/lib/whatsapp'
import { PageHeader } from '@/components/content/PageHeader'
import { ServiceCard } from '@/components/content/ServiceCard'
import { PriceTable } from '@/components/content/PriceTable'
import { FAQList } from '@/components/content/FAQ'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { CtaBanner } from '@/components/layout/CtaBanner'

export async function servicesMetadata(locale: Locale): Promise<Metadata> {
  const ui = await getUi(locale)
  const m = getMessages(locale)
  const seo = ui.pages?.services?.seo
  return pageMetadata({ locale, route: 'services', title: seo?.title || m.services.indexTitle, description: seo?.description || ui.pages?.services?.intro || m.services.indexIntro, image: seo?.ogImage })
}

export async function ServicesPage({ locale }: { locale: Locale }) {
  const [ui, site, services, prices, faqs] = await Promise.all([
    getUi(locale), getSite(locale), getTopServices(locale), getFeaturedPrices(locale), getFaqs(locale, { category: 'layanan' }),
  ])
  const m = getMessages(locale)
  const serviceHref = (slug: string) => href(locale, 'services', slug)
  const wa = whatsappHref(site.whatsapp, site.whatsappDefaultMessage)

  return (
    <>
      <PageHeader title={m.services.indexTitle} intro={ui.pages?.services?.intro || m.services.indexIntro}
        crumbLabel={m.services.breadcrumb}
        crumbs={[{ label: ui.nav?.home || 'Home', href: href(locale, 'home') }, { label: ui.nav?.services || '' }]} />

      {services.length ? (
        <section className="ag-section" aria-labelledby="services-list-title">
          <div className="ag-container">
            <h2 id="services-list-title" className="ag-visually-hidden">{ui.nav?.services}</h2>
            <ul className="ag-grid ag-grid--3">
              {services.map((s, i) => (
                <li key={s.slug}>
                  <Reveal step={(i % 3) as 0 | 1 | 2}>
                    <ServiceCard icon={s.icon} title={s.title} summary={s.summary} href={serviceHref(s.slug)} moreLabel={ui.cta?.more || ''}
                      subServices={s.children.map(c => ({ label: c.title, href: serviceHref(c.slug) }))} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {prices.length ? (
        <section className="ag-section ag-section--soft" aria-labelledby="price-title" id="harga">
          <div className="ag-container ag-stack">
            <Reveal><SectionHeading id="price-title" title={m.services.priceTitle} intro={m.services.priceIntro} /></Reveal>
            <PriceTable locale={locale} note={ui.price?.note}
              labels={{ service: ui.price?.service || '', duration: ui.price?.duration || '', from: ui.price?.from || '', contact: ui.price?.contact || '' }}
              rows={prices.map(p => ({ ...p, href: serviceHref(p.serviceSlug) }))} />
          </div>
        </section>
      ) : null}

      {faqs.length ? (
        <section className="ag-section" aria-labelledby="services-faq-title">
          <div className="ag-container ag-split">
            <Reveal><SectionHeading id="services-faq-title" title={m.services.faqTitle} /></Reveal>
            <Reveal step={1}><FAQList items={faqs} /></Reveal>
          </div>
        </section>
      ) : null}

      <CtaBanner title={m.ctaBanner.title} highlight={m.ctaBanner.highlight} text={m.ctaBanner.text}
        primary={{ label: ui.cta?.whatsapp || '', href: wa }}
        secondary={{ label: ui.cta?.consult || '', href: href(locale, 'contact') }} />
    </>
  )
}

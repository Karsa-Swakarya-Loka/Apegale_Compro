// /layanan/[slug] · /en/services/[slug] — published services only. Unknown slugs are 404; a service still in
// draft (old URLs point at several) sends visitors to its closest published parent with a temporary redirect.
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { href } from '@/i18n/routes'
import { asMedia, getFaqs, getServiceBySlug, getSite, getTopServices, getUi, getUnpublishedServiceFallback } from '@/lib/cms'
import { whatsappHref } from '@/lib/whatsapp'
import { PageHeader } from '@/components/content/PageHeader'
import { Prose } from '@/components/content/Prose'
import { ServiceCard } from '@/components/content/ServiceCard'
import { PriceTable } from '@/components/content/PriceTable'
import { FAQList } from '@/components/content/FAQ'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/BrandIcons'
import { Reveal } from '@/components/motion/Reveal'
import { CtaBanner } from '@/components/layout/CtaBanner'
import { serviceLd } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'

export async function serviceMetadata(locale: Locale, slug: string): Promise<Metadata> {
  const service = await getServiceBySlug(locale, slug)
  if (!service) return {}
  return pageMetadata({ locale, route: 'services', slug, title: service.seo?.title || service.title,
    description: service.seo?.description || service.summary, image: asMedia(service.seo?.ogImage) ?? service.image })
}

export async function ServiceDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
  const [service, ui, site, topServices] = await Promise.all([getServiceBySlug(locale, slug), getUi(locale), getSite(locale), getTopServices(locale)])
  if (!service) {
    const fallback = await getUnpublishedServiceFallback(slug)
    if (fallback === undefined) notFound()
    redirect(fallback ? href(locale, 'services', fallback) : href(locale, 'services'))
  }
  const m = getMessages(locale)
  const faqs = await getFaqs(locale, { serviceId: service.id })
  const serviceHref = (s: string) => href(locale, 'services', s)
  const waService = whatsappHref(site.whatsapp, m.services.waMessage.replace('{service}', service.title))
  const others = topServices.filter(s => s.slug !== service.slug && s.slug !== service.parentDoc?.slug)
  const crumbs = [
    { label: ui.nav?.home || 'Home', href: href(locale, 'home') },
    { label: ui.nav?.services || '', href: href(locale, 'services') },
    ...(service.parentDoc ? [{ label: service.parentDoc.title, href: serviceHref(service.parentDoc.slug) }] : []),
    { label: service.title },
  ]
  const prices = (service.priceItems ?? []).map((p, i) => ({ id: p.id || String(i), name: p.name, note: p.note, duration: p.duration, priceFrom: p.priceFrom, featured: p.featured }))

  return (
    <>
      <JsonLd data={serviceLd(service, locale)} />
      <PageHeader title={service.title} intro={service.summary}
        crumbs={crumbs} crumbLabel={m.services.breadcrumb} />

      <section className="ag-section">
        <div className="ag-container ag-detail">
          <div className="ag-detail__main">
            <Prose data={service.body} />
            {service.requirements?.length ? (
              <ul className="ag-checklist">
                {service.requirements.map(r => <li key={r.id ?? r.text}><CheckCircle2 size={22} aria-hidden="true" /><span>{r.text}</span></li>)}
              </ul>
            ) : null}
          </div>
          <aside className="ag-detail__aside" aria-label={ui.nav?.services || ''}>
            <div className="ag-card ag-detail__card">
              <p className="ag-eyebrow">{ui.nav?.services}</p>
              <ul className="ag-detail__links">
                {topServices.map(s => (
                  <li key={s.slug}>
                    <Link href={serviceHref(s.slug)} aria-current={s.slug === service.slug || s.slug === service.parentDoc?.slug ? 'page' : undefined}>
                      {s.title}<ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              {waService ? <Button variant="wa" href={waService} label={ui.cta?.askWhatsapp || ''} icon={<WhatsAppIcon size={20} />} /> : null}
            </div>
          </aside>
        </div>
      </section>

      {service.children.length ? (
        <section className="ag-section ag-section--soft" aria-labelledby="options-title">
          <div className="ag-container ag-stack">
            <Reveal><SectionHeading id="options-title" title={m.services.optionsTitle} /></Reveal>
            <ul className="ag-grid ag-grid--3">
              {service.children.map((c, i) => (
                <li key={c.slug}><Reveal step={(i % 3) as 0 | 1 | 2}>
                  <ServiceCard icon={c.icon} title={c.title} summary={c.summary} href={serviceHref(c.slug)} moreLabel={ui.cta?.more || ''} />
                </Reveal></li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {prices.length ? (
        <section className="ag-section" aria-labelledby="service-price-title">
          <div className="ag-container ag-stack">
            <SectionHeading id="service-price-title" title={m.services.priceTitle} />
            <PriceTable locale={locale} rows={prices} note={service.priceNote || ui.price?.note}
              updated={{ label: m.services.updated, date: service.priceUpdatedAt }}
              labels={{ service: ui.price?.service || '', duration: ui.price?.duration || '', from: ui.price?.from || '', contact: ui.price?.contact || '' }} />
          </div>
        </section>
      ) : null}

      {faqs.length ? (
        <section className="ag-section" aria-labelledby="service-faq-title">
          <div className="ag-container ag-split">
            <SectionHeading id="service-faq-title" title={m.services.faqTitle} />
            <FAQList items={faqs} />
          </div>
        </section>
      ) : null}

      {others.length ? (
        <section className="ag-section ag-section--soft" aria-labelledby="other-title">
          <div className="ag-container ag-stack">
            <Reveal><SectionHeading id="other-title" title={m.services.otherTitle} /></Reveal>
            <ul className="ag-grid ag-grid--3">
              {others.slice(0, 3).map((s, i) => (
                <li key={s.slug}><Reveal step={(i % 3) as 0 | 1 | 2}>
                  <ServiceCard icon={s.icon} title={s.title} summary={s.summary} href={serviceHref(s.slug)} moreLabel={ui.cta?.more || ''} />
                </Reveal></li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBanner title={m.ctaBanner.title} highlight={m.ctaBanner.highlight} text={m.ctaBanner.text}
        primary={{ label: ui.cta?.whatsapp || '', href: waService }}
        secondary={{ label: ui.cta?.consult || '', href: href(locale, 'contact') }} />
    </>
  )
}

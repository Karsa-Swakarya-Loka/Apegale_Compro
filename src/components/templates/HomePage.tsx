// Home: 11 sections in the order of docs/02. Each optional section hides itself when the CMS
// switches it off (home.sectionsVisible) or when it has no published content.
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { href, localizeHref } from '@/i18n/routes'
import {
  asMedia, getAbout, getClients, getFeaturedFaqs, getGaris, getHome, getLatestArticles, getSite, getTestimonials, getTopServices, getUi,
} from '@/lib/cms'
import { telHref, whatsappHref } from '@/lib/whatsapp'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { ClientStrip } from '@/components/content/ClientStrip'
import { ServicesSection } from '@/components/home/ServicesSection'
import { Testimonial } from '@/components/content/Testimonial'
import { FAQList } from '@/components/content/FAQ'
import { NewsCard } from '@/components/content/NewsCard'
import { Hero } from '@/components/home/Hero'
import { WhySection } from '@/components/home/WhySection'
import { GarisSection } from '@/components/home/GarisSection'
import { NetworkSection } from '@/components/home/NetworkSection'
import { AboutSection } from '@/components/home/AboutSection'
import { ContactCta, type ContactLine } from '@/components/home/ContactCta'
import { formatWhatsApp } from '@/components/layout/Header'
import { ContactForm } from '@/components/forms/ContactForm'
import { formLabels } from '@/components/forms/labels'
import { lexicalText, organizationLd } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'

export async function homeMetadata(locale: Locale): Promise<Metadata> {
  const [home, site] = await Promise.all([getHome(locale), getSite(locale)])
  const title = home.seo?.title || site.seoDefault?.title || 'Ape Gale Indonesia'
  return pageMetadata({ locale, route: 'home', title, absoluteTitle: true, description: home.seo?.description, image: home.seo?.ogImage })
}

export async function HomePage({ locale }: { locale: Locale }) {
  const [home, site, ui, about, garis, clients, services, testimonials, faqs, articles] = await Promise.all([
    getHome(locale), getSite(locale), getUi(locale), getAbout(locale), getGaris(locale), getClients(locale),
    getTopServices(locale), getTestimonials(locale), getFeaturedFaqs(locale), getLatestArticles(locale, 3),
  ])
  const m = getMessages(locale)
  const show = (key: keyof NonNullable<typeof home.sectionsVisible>) => home.sectionsVisible?.[key] !== false
  const wa = whatsappHref(site.whatsapp, site.whatsappDefaultMessage)
  const cta = (link?: { label?: string | null; href?: string | null }) => ({
    label: link?.label || '', href: link?.href === 'whatsapp' ? wa : localizeHref(link?.href, locale),
  })
  const stats = (site.stats ?? []).map(s => ({ value: s.value, label: s.label }))
  const serviceHref = (slug: string) => href(locale, 'services', slug)
  const visibleTestimonials = testimonials.filter(t => t.quote)
  // The old home page shows the first "Tentang Kami" paragraph of the company profile.
  const aboutText = lexicalText(about.profile).split('\n\n')[0] || null
  const contacts: ContactLine[] = []
  if (site.phone) contacts.push({ kind: 'phone', label: m.contact.phone, value: site.phone, href: telHref(site.phone) })
  if (wa) contacts.push({ kind: 'whatsapp', label: 'WhatsApp', value: formatWhatsApp(site.whatsapp), href: wa })
  if (site.email) contacts.push({ kind: 'email', label: 'Email', value: site.email, href: `mailto:${site.email}` })
  if (site.address) contacts.push({ kind: 'address', label: m.contact.address, value: site.address, href: site.mapsUrl || undefined })

  return (
    <>
      <JsonLd data={organizationLd(site, locale, home.seo?.description || site.seoDefault?.description)} />
      {show('hero') ? (
        <Hero eyebrow={home.hero?.eyebrow} headline={home.hero?.headline || 'Ape Gale Indonesia'} highlight={home.hero?.highlight}
          lead={home.hero?.lead} image={asMedia(home.hero?.image)} primary={cta(home.hero?.primaryCta)}
          secondary={cta(home.hero?.secondaryCta)} stats={stats} />
      ) : null}

      {show('clients') ? <ClientStrip clients={clients} labels={{ title: ui.sections?.clients || '' }} /> : null}

      {show('services') && services.length ? (
        <ServicesSection title={m.home.servicesTitle} highlight={m.home.servicesHighlight} intro={m.home.servicesIntro} moreLabel={ui.cta?.more || ''}
          all={ui.cta?.viewServices ? { label: ui.cta.viewServices, href: href(locale, 'services') } : undefined}
          services={services.map(s => ({ slug: s.slug, title: s.title, summary: s.summary, icon: s.icon, href: serviceHref(s.slug) }))} />
      ) : null}

      {show('why') ? <WhySection eyebrow={ui.sections?.why} title={m.home.whyTitle} highlight={m.home.whyHighlight} items={home.why ?? []} /> : null}

      {show('garis') ? (
        <GarisSection garis={garis} title={m.home.garisTitle} highlight={m.home.garisHighlight} intro={m.home.garisIntro} whatsapp={wa} more={{ label: ui.cta?.more || '', href: href(locale, 'garis') }}
          labels={{ login: m.home.garisLogin, trial: m.home.garisTrial, comingSoon: ui.cta?.comingSoon || '', ask: ui.cta?.askWhatsapp || '' }} />
      ) : null}

      {show('network') && home.network?.title ? (
        <NetworkSection tone="soft" title={home.network.title} text={home.network.text}
          cities={home.network.cities ?? []} citiesLabel={m.home.networkCities} />
      ) : null}

      {show('founder') ? (
        <AboutSection eyebrow={m.home.aboutEyebrow} title={m.home.aboutTitle} highlight={m.home.aboutHighlight} text={aboutText}
          founder={{ name: home.founder?.name, role: home.founder?.role, quote: home.founder?.quote, photo: asMedia(home.founder?.photo) }}
          more={{ label: ui.cta?.more || '', href: href(locale, 'about') }} />
      ) : null}

      {show('testimonials') && visibleTestimonials.length ? (
        <section className="ag-section ag-section--dark" aria-labelledby="testimonials-title">
          <div className="ag-container ag-stack">
            <Reveal><SectionHeading id="testimonials-title" title={m.home.testimonialsTitle} highlight={m.home.testimonialsHighlight} /></Reveal>
            <div className="ag-grid ag-grid--3">{visibleTestimonials.slice(0, 3).map(t => <Testimonial key={t.id} item={t} />)}</div>
          </div>
        </section>
      ) : null}

      {show('faq') && faqs.length ? (
        <section className="ag-section ag-section--soft" aria-labelledby="faq-title">
          <div className="ag-container ag-split">
            <Reveal><SectionHeading id="faq-title" title={m.home.faqTitle} highlight={m.home.faqHighlight} /></Reveal>
            <Reveal step={1}><FAQList items={faqs} /></Reveal>
          </div>
        </section>
      ) : null}

      {show('news') && articles.length ? (
        <section className="ag-section" aria-labelledby="news-title">
          <div className="ag-container ag-stack">
            <div className="ag-headrow">
              <Reveal><SectionHeading id="news-title" title={m.home.newsTitle} highlight={m.home.newsHighlight} /></Reveal>
              <Button variant="ghost" href={href(locale, 'news')} label={ui.cta?.more || ''} icon={<ArrowRight size={18} aria-hidden="true" />} />
            </div>
            <div className="ag-grid ag-grid--3">
              {articles.map(a => (
                <NewsCard key={`${a.kind}-${a.slug}`} locale={locale} title={a.title} cover={a.cover} date={a.date} readLabel={ui.cta?.read || ''}
                  category={a.kind === 'regulation' ? m.home.categories.regulation : m.home.categories[a.category as 'news' | 'panduan'] ?? a.category}
                  href={href(locale, a.kind === 'regulation' ? 'regulations' : 'news', a.slug)} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {show('contactCta') ? (
        <ContactCta title={m.ctaBanner.title} highlight={m.ctaBanner.highlight} text={m.ctaBanner.text} contacts={contacts}
          form={<ContactForm variant="compact" locale={locale} idPrefix="quick" labels={formLabels(ui, m, m.home.formTitle)}
            services={services.map(s => ({ value: s.slug, label: s.title }))} />} />
      ) : null}
    </>
  )
}

// /garis · /en/garis — product page. Login / free trial stay disabled ("Segera Hadir") until the CMS sets
// garis.enabled and a URL; the page reads the CMS on every request, so switching it on needs no deploy.
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import Image from 'next/image'
import { ClipboardCheck, PlaneLanding, UsersRound } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { href } from '@/i18n/routes'
import { asMedia, getFaqs, getGaris, getSite, getUi } from '@/lib/cms'
import { whatsappHref } from '@/lib/whatsapp'
import { PageHeader } from '@/components/content/PageHeader'
import { FAQList } from '@/components/content/FAQ'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/BrandIcons'
import { Reveal } from '@/components/motion/Reveal'

const moduleIcons = [ClipboardCheck, PlaneLanding, UsersRound]

export async function garisMetadata(locale: Locale): Promise<Metadata> {
  const garis = await getGaris(locale)
  const m = getMessages(locale)
  return pageMetadata({ locale, route: 'garis', title: garis.seo?.title || `GARIS (${m.home.garisTitle})`, description: garis.seo?.description || garis.intro, image: garis.seo?.ogImage })
}

export async function GarisPage({ locale }: { locale: Locale }) {
  const [garis, ui, site, faqs] = await Promise.all([getGaris(locale), getUi(locale), getSite(locale), getFaqs(locale, { category: 'garis' })])
  const m = getMessages(locale)
  const live = Boolean(garis.enabled)
  const wa = whatsappHref(site.whatsapp, m.garis.waMessage)
  const soon = ui.cta?.comingSoon || ''
  const action = (label: string, url?: string | null, variant: 'primary' | 'outline' | 'light' = 'primary') =>
    live && url ? <Button variant={variant} href={url} label={label} /> : <Button disabled label={`${label} · ${soon}`} />
  const shots = (garis.gallery ?? []).map(g => asMedia(g.image)).filter(x => x?.url && x.width && x.height)
  const logo = asMedia(garis.logo)
  const modules = (garis.variants ?? []).filter(v => v.name)
  const features = (garis.features ?? []).filter(f => f.title)

  return (
    <>
      <PageHeader title="GARIS" intro={m.home.garisTitle} crumbLabel={m.services.breadcrumb}
        crumbs={[{ label: ui.nav?.home || 'Home', href: href(locale, 'home') }, { label: 'GARIS' }]}
        actions={<>
          {wa ? <Button variant="wa" href={wa} label={ui.cta?.askWhatsapp || ''} icon={<WhatsAppIcon size={20} />} /> : null}
          {action(m.home.garisLogin, garis.loginUrl, 'light')}
        </>} />

      {shots.length ? (
        <section className="ag-section" aria-labelledby="garis-overview-title">
          <div className="ag-container ag-garis">
            <Reveal className="ag-garis__copy">
              {logo?.url && logo.width && logo.height ? <Image src={logo.url} alt="GARIS" width={logo.width} height={logo.height} className="ag-garis__logo" /> : null}
              <SectionHeading id="garis-overview-title" title={m.home.garisTitle} intro={garis.intro} />
            </Reveal>
            <Reveal step={1} className="ag-garis__shots">
              {shots.map((s, i) => s && (
                <div key={s.id} className={`ag-garis__shot ag-garis__shot--${i === 0 ? 'wide' : 'phone'}`}>
                  <Image src={s.url!} alt={s.alt || ''} width={s.width!} height={s.height!} sizes={i === 0 ? '(max-width: 1023px) 100vw, 45vw' : '220px'} />
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      ) : null}

      {modules.length ? (
        <section className="ag-section ag-section--dark" aria-labelledby="garis-modules-title">
          <div className="ag-container ag-stack">
            <SectionHeading id="garis-modules-title" title={m.garis.modulesTitle} />
            <ul className="ag-why ag-why--3">
              {modules.map((v, i) => {
                const Glyph = moduleIcons[i % moduleIcons.length]
                const img = asMedia(v.image)
                return (
                  <li key={v.id ?? v.name}>
                    <Reveal step={(i % 3) as 0 | 1 | 2} className="ag-why__item">
                      <span className="ag-why__icon"><Glyph size={24} aria-hidden="true" /></span>
                      <h3>{v.name}</h3>
                      {v.text ? <div className="ag-module__text">{v.text.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div> : null}
                      {img?.url && img.width && img.height ? <Image src={img.url} alt={img.alt || ''} width={img.width} height={img.height} sizes="360px" className="ag-garis__module-img" /> : null}
                    </Reveal>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {features.length ? (
        <section className="ag-section" aria-labelledby="garis-features-title">
          <div className="ag-container ag-stack">
            <Reveal><SectionHeading id="garis-features-title" title={m.garis.featuresTitle} /></Reveal>
            <ul className="ag-feature-list">
              {features.map(f => <li key={f.id ?? f.title}><h3>{f.title}</h3>{f.text ? <p>{f.text}</p> : null}</li>)}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="ag-section ag-section--soft" id="coba-gratis" aria-labelledby="garis-trial-title">
        <div className="ag-container ag-trial">
          <Reveal className="ag-stack">
            <SectionHeading id="garis-trial-title" title={m.garis.trialTitle} intro={live ? m.garis.trialLive : m.garis.trialSoon} />
            <div className="ag-row">
              {wa ? <Button variant="wa" href={wa} label={ui.cta?.askWhatsapp || ''} icon={<WhatsAppIcon size={20} />} /> : null}
              {action(m.home.garisTrial, garis.trialUrl)}
            </div>
          </Reveal>
        </div>
      </section>

      {faqs.length ? (
        <section className="ag-section" aria-labelledby="garis-faq-title">
          <div className="ag-container ag-split">
            <SectionHeading id="garis-faq-title" title={m.garis.faqTitle} />
            <FAQList items={faqs} />
          </div>
        </section>
      ) : null}
    </>
  )
}

// /tentang-kami · /en/about — anchors #salam, #founder, #profil, #organigram (menu + old-URL redirects).
// Section tones alternate white / soft / maroon so red and white carry equal weight.
import type { Metadata } from 'next'
import { pageMetadata } from '@/lib/seo'
import Image from 'next/image'
import { Handshake, Lightbulb, ShieldCheck } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { href } from '@/i18n/routes'
import { asMedia, getAbout, getHome, getSite, getUi } from '@/lib/cms'
import { whatsappHref } from '@/lib/whatsapp'
import { PageHeader } from '@/components/content/PageHeader'
import { Prose } from '@/components/content/Prose'
import { Organigram } from '@/components/content/Organigram'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { WhySection } from '@/components/home/WhySection'
import { NetworkSection } from '@/components/home/NetworkSection'
import { CtaBanner } from '@/components/layout/CtaBanner'

const valueIcons = [Handshake, Lightbulb, ShieldCheck]

export async function aboutMetadata(locale: Locale): Promise<Metadata> {
  const about = await getAbout(locale)
  const m = getMessages(locale)
  return pageMetadata({ locale, route: 'about', title: about.seo?.title || m.about.title, description: about.seo?.description || about.intro || m.about.intro, image: about.seo?.ogImage })
}

export async function AboutPage({ locale }: { locale: Locale }) {
  const [about, home, ui, site] = await Promise.all([getAbout(locale), getHome(locale), getUi(locale), getSite(locale)])
  const m = getMessages(locale)
  const photo = asMedia(home.founder?.photo)
  const wa = whatsappHref(site.whatsapp, site.whatsappDefaultMessage)
  const mission = (about.mission ?? []).filter(x => x.text)
  const values = (about.values ?? []).filter(v => v.title)

  return (
    <>
      <PageHeader locale={locale} title={m.about.title} intro={about.intro || m.about.intro} crumbLabel={m.services.breadcrumb}
        crumbs={[{ label: ui.nav?.home || 'Home', href: href(locale, 'home') }, { label: ui.nav?.about || '' }]} />

      <section className="ag-section" id="salam" aria-labelledby="greeting-title">
        <div className="ag-container ag-about">
          {photo?.url && photo.width && photo.height ? (
            <Reveal className="ag-about__photo">
              <figure id="founder" className="ag-founder">
                <Image src={photo.url} alt={photo.alt || home.founder?.name || ''} width={photo.width} height={photo.height} sizes="(max-width: 767px) 80vw, 360px" />
              </figure>
            </Reveal>
          ) : null}
          <Reveal step={1} className="ag-about__copy">
            <SectionHeading id="greeting-title" title={m.about.greetingTitle} />
            <Prose data={about.greeting} />
            {home.founder?.name ? <p className="ag-about__founder"><b>{home.founder.name}</b>{home.founder.role ? <span>{home.founder.role}</span> : null}</p> : null}
          </Reveal>
        </div>
      </section>

      <section className="ag-section ag-section--soft" id="profil" aria-labelledby="profile-title">
        <div className="ag-container ag-split">
          <Reveal className="ag-stack">
            <SectionHeading id="profile-title" title={m.about.profileTitle} />
            <Prose data={about.profile} />
          </Reveal>
          <Reveal step={1} className="ag-vm">
            {about.vision ? (
              <div className="ag-vm__vision">
                <span className="ag-eyebrow">{m.about.vision}</span>
                <p>{about.vision}</p>
              </div>
            ) : null}
            {mission.length ? (
              <div className="ag-vm__mission">
                <span className="ag-eyebrow">{m.about.mission}</span>
                <ol>{mission.map(x => <li key={x.id ?? x.text}>{x.text}</li>)}</ol>
              </div>
            ) : null}
          </Reveal>
        </div>
      </section>

      {values.length ? (
        <section className="ag-section" aria-labelledby="values-title">
          <div className="ag-container ag-stack">
            <Reveal><SectionHeading id="values-title" title={m.about.valuesTitle} /></Reveal>
            <ul className="ag-grid ag-grid--3">
              {values.map((v, i) => {
                const Glyph = valueIcons[i % valueIcons.length]
                return (
                  <li key={v.id ?? v.title}>
                    <Reveal step={(i % 3) as 0 | 1 | 2}>
                      <article className="ag-card ag-value">
                        <span className="ag-value__icon"><Glyph size={26} aria-hidden="true" /></span>
                        <h3>{v.title}</h3>
                        {v.text ? <p>{v.text}</p> : null}
                      </article>
                    </Reveal>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      ) : null}

      <WhySection title={m.home.whyTitle} highlight={m.home.whyHighlight} items={home.why ?? []} />

      {about.organigram?.length ? (
        <section className="ag-section" id="organigram" aria-labelledby="organigram-title">
          <div className="ag-container ag-stack">
            <Reveal><SectionHeading id="organigram-title" title={m.about.organigramTitle} align="center" /></Reveal>
            <Reveal step={1}><Organigram people={about.organigram} label={m.about.organigramTitle} /></Reveal>
          </div>
        </section>
      ) : null}

      {home.network?.title ? (
        <NetworkSection tone="soft" title={home.network.title} text={home.network.text}
          cities={home.network.cities ?? []} citiesLabel={m.home.networkCities} />
      ) : null}

      <CtaBanner title={m.ctaBanner.title} highlight={m.ctaBanner.highlight} text={m.ctaBanner.text}
        primary={{ label: ui.cta?.whatsapp || '', href: wa }}
        secondary={{ label: ui.cta?.consult || '', href: href(locale, 'contact') }} />
    </>
  )
}

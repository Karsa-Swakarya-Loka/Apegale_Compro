// Shared public shell: skip link → Header → page → Footer → WhatsAppFloat.
// Rendered by the per-locale layouts so switching language re-renders it with the new locale.
import type { ReactNode } from 'react'
import { draftMode } from 'next/headers'
import type { Locale } from '@/i18n/config'
import { getMessages } from '@/i18n/messages'
import { href } from '@/i18n/routes'
import { getMenuServices, getSite, getUi } from '@/lib/cms'
import { whatsappHref } from '@/lib/whatsapp'
import type { NavItem } from './HeaderNav'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppFloat } from './WhatsAppFloat'

export async function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const [site, ui, services, preview] = await Promise.all([getSite(locale), getUi(locale), getMenuServices(locale), draftMode()])
  const m = getMessages(locale)
  const nav = ui.nav ?? {}
  const serviceLink = (slug: string) => href(locale, 'services', slug)
  const items: NavItem[] = [
    { label: nav.home || 'Home', href: href(locale, 'home') },
    { label: nav.about || '', href: href(locale, 'about'),
      children: m.aboutAnchors.map(a => ({ label: a.label, href: href(locale, 'about', undefined, a.hash) })) },
    { label: nav.services || '', href: href(locale, 'services'),
      children: services.map(s => ({ label: s.title, href: serviceLink(s.slug),
        children: s.children.map(c => ({ label: c.title, href: serviceLink(c.slug),
          children: c.children.map(g => ({ label: g.title, href: serviceLink(g.slug) })) })) })) },
    { label: nav.garis || 'GARIS', href: href(locale, 'garis') },
    { label: nav.regulations || '', href: href(locale, 'regulations') },
    { label: nav.news || '', href: href(locale, 'news') },
    { label: nav.contact || '', href: href(locale, 'contact') },
  ].filter(i => i.label)
  const wa = whatsappHref(site.whatsapp, site.whatsappDefaultMessage)
  const languageLabel = ui.lang?.label || ''

  return (
    <>
      <a className="ag-skip" href="#konten">{m.skipToContent}</a>
      {preview.isEnabled ? (
        <form className="ag-preview" action="/preview/exit" method="post" role="status">
          <span>{m.preview.label}</span><button type="submit">{m.preview.exit}</button>
        </form>
      ) : null}
      <Header locale={locale} site={site} items={items} messages={m} languageLabel={languageLabel}
        cta={{ label: ui.cta?.consult || '', href: href(locale, 'contact') }} />
      <main id="konten" tabIndex={-1}>{children}</main>
      <Footer locale={locale} site={site} messages={m}
        services={services.map(s => ({ label: s.title, href: serviceLink(s.slug) }))}
        company={(['about', 'garis', 'news', 'contact'] as const).map(k => ({ label: nav[k] || '', href: href(locale, k) })).filter(l => l.label)} />
      <WhatsAppFloat href={wa} label={ui.cta?.askWhatsapp || ''} />
    </>
  )
}

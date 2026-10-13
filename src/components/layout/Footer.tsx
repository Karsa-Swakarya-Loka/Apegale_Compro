// design/components/Footer — maroon-deep, official address/contacts, services, company, regulations.
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import type { Site } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import type { Messages } from '@/i18n/messages'
import { href } from '@/i18n/routes'
import { telHref, whatsappHref } from '@/lib/whatsapp'
import { InstagramIcon, WhatsAppIcon } from '@/components/ui/BrandIcons'
import { formatWhatsApp } from './Header'

type FooterLink = { label: string; href: string }
type Props = { locale: Locale; site: Site; services: FooterLink[]; company: FooterLink[]; messages: Messages }

export function Footer({ locale, site, services, company, messages }: Props) {
  const wa = whatsappHref(site.whatsapp, site.whatsappDefaultMessage)
  const instagram = site.social?.find(s => s.platform === 'instagram')
  const phoneLabel = messages.contact.phone + ': ' + (site.phone ?? '')
  const whatsappLabel = 'WhatsApp: ' + formatWhatsApp(site.whatsapp)
  const emailLabel = 'Email: ' + (site.email ?? '')
  const instagramLabel = 'Instagram: Ape Gale Indonesia'
  const regulations = messages.regulationCategories.map(c => ({
    label: c.label, href: `${href(locale, 'regulations')}?kategori=${c.value}`,
  }))
  return (
    <footer className="ag-footer">
      <div className="ag-footer__in">
        <div className="ag-footer__brand">
          <Image className="ag-footer__logo" src="/brand/apegale-logo-on-dark.png" alt="Ape Gale Indonesia"
            width={1200} height={409} sizes="180px" />
          {site.address ? <address><p>{site.address}</p></address> : null}
          <ul className="ag-footer__contacts" aria-label={messages.footer.contact}>
            {site.phone ? <li><a className="ag-footer__contact-icon" href={telHref(site.phone)} aria-label={phoneLabel} title={phoneLabel}><Phone size={20} aria-hidden="true" /></a></li> : null}
            {wa ? <li><a className="ag-footer__contact-icon" href={wa} target="_blank" rel="noopener noreferrer" aria-label={whatsappLabel} title={whatsappLabel}><WhatsAppIcon size={20} /></a></li> : null}
            {site.email ? <li><a className="ag-footer__contact-icon" href={"mailto:" + site.email} aria-label={emailLabel} title={emailLabel}><Mail size={20} aria-hidden="true" /></a></li> : null}
            {instagram ? <li><a className="ag-footer__contact-icon" href={instagram.url} target="_blank" rel="noopener noreferrer" aria-label={instagramLabel} title={instagramLabel}><InstagramIcon size={20} /></a></li> : null}
          </ul>
        </div>
        {services.length ? <FooterList title={messages.footer.services} links={services} /> : null}
        <FooterList title={messages.footer.company} links={company} />
        <FooterList title={messages.footer.regulations} links={regulations} />
      </div>
      <div className="ag-footer__base">
        <div className="ag-footer__copyright">
          <span>© {new Date().getFullYear()} PT Ape Gale Indonesia. {messages.rights}</span>
        </div>
      </div>
    </footer>
  )
}

function FooterList({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="ag-footer__title">{title}</h2>
      <ul>{links.map(l => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
    </nav>
  )
}

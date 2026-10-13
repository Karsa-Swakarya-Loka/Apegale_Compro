// design/components/Header — maroon-deep topbar (contacts + language) above a sticky white bar.
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'
import type { Site } from '@/payload-types'
import type { Locale } from '@/i18n/config'
import type { Messages } from '@/i18n/messages'
import { href } from '@/i18n/routes'
import { telHref, whatsappHref } from '@/lib/whatsapp'
import { WhatsAppIcon } from '@/components/ui/BrandIcons'
import { HeaderNav, type NavItem } from './HeaderNav'
import { LanguageToggle } from './LanguageToggle'

type Props = {
  locale: Locale
  site: Site
  items: NavItem[]
  cta: { label: string; href?: string }
  messages: Messages
  languageLabel: string
}

export function Header({ locale, site, items, cta, messages, languageLabel }: Props) {
  const wa = whatsappHref(site.whatsapp, site.whatsappDefaultMessage)
  return (
    <>
      <div className="ag-topbar">
        <div className="ag-topbar__in">
          {site.phone ? <a href={telHref(site.phone)}><Phone aria-hidden="true" />{site.phone}</a> : null}
          {wa ? (
            <a href={wa} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={16} />{messages.whatsappShort} {formatWhatsApp(site.whatsapp)}
            </a>
          ) : null}
          {site.email ? <a href={`mailto:${site.email}`}><Mail aria-hidden="true" />{site.email}</a> : null}
          <span className="ag-topbar__end">
            <LanguageToggle label={languageLabel} variant="on-dark" />
          </span>
        </div>
      </div>
      <header className="ag-header">
        <div className="ag-header__in">
          <HeaderNav brand={<Image className="ag-header__logo" src="/brand/apegale-logo.png" alt="Ape Gale Indonesia"
              width={1200} height={409} loading="eager" sizes="160px" />} items={items} cta={cta} homeHref={href(locale, 'home')}
            labels={{ mainMenu: messages.mainMenu, openMenu: messages.openMenu, closeMenu: messages.closeMenu, showSubmenu: messages.showSubmenu, language: languageLabel }} />
        </div>
      </header>
    </>
  )
}

/** 628119996286 → 0811 9996 286 (local display format). */
export function formatWhatsApp(digits?: string | null): string {
  const d = String(digits ?? '').replace(/\D/g, '').replace(/^62/, '0')
  return d.replace(/^(\d{4})(\d{4})(\d+)$/, '$1 $2 $3')
}

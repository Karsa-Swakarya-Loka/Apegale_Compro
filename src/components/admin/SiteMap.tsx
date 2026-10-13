// Dashboard widget in place of Payload's collection cards: the sidebar's sections (nav-map.ts) with what each page holds.
// Hidden while the sidebar is open (admin-theme.css), so the map shows once: in the sidebar, or here on phones.
import Link from 'next/link'
import type { PayloadRequest, SanitizedPermissions } from 'payload'
import { NavIcon } from './NavIcon'
import { resolveNav } from './nav'
import { NAV_MAP } from './nav-map'

export async function SiteMap({ req, permissions }: { req: PayloadRequest; permissions?: SanitizedPermissions }) {
  const sections = await resolveNav({ map: NAV_MAP, payload: req.payload, permissions, user: req.user })
  return (
    <nav className="cms-sitemap" aria-label="Semua bagian CMS">
      {sections.map(section => (
        <section className="cms-sitemap__group" key={section.label}>
          <h2 className="cms-sitemap__label">{section.label}</h2>
          <ul className="cms-sitemap__list">
            {section.links.map(link => (
              <li key={link.href}>
                <Link className="cms-sitemap__item" href={link.href} prefetch={false}>
                  <NavIcon name={link.icon} />
                  <span className="cms-sitemap__text">
                    <span className="cms-sitemap__name">{link.label}</span>
                    {link.hint ? <span className="cms-sitemap__hint">{link.hint}</span> : null}
                  </span>
                  {link.badge ? <span className="cms-nav__badge">{link.badge}<span className="cms-sr"> baru</span></span> : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </nav>
  )
}

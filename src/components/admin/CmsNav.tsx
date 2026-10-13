// Sidebar (admin.components.Nav): Payload's own open/close shell (NavWrapper, NavHamburger) around the sections of
// nav-map.ts, with the signed-in account, the public site and sign-out at the foot.
import { NavHamburger, NavWrapper } from '@payloadcms/next/client'
import type { Payload, SanitizedPermissions, TypedUser } from 'payload'
import { CmsNavLinks } from './CmsNavLinks'
import { NavIcon } from './NavIcon'
import { resolveNav } from './nav'
import { NAV_MAP } from './nav-map'

type Props = { payload: Payload; permissions?: SanitizedPermissions; user?: TypedUser | null }

export async function CmsNav({ payload, permissions, user }: Props) {
  const sections = await resolveNav({ map: NAV_MAP, payload, permissions, user })
  const admin = payload.config.routes.admin
  return (
    <NavWrapper baseClass="nav">
      <nav className="nav__wrap cms-nav" aria-label="Menu CMS">
        <CmsNavLinks home={admin} sections={sections} />
        <div className="cms-nav__foot">
          {user?.email ? <p className="cms-nav__account" title={user.email}>{user.email}</p> : null}
          <a className="cms-nav__link" href={process.env.NEXT_PUBLIC_SITE_URL || '/'} target="_blank" rel="noopener noreferrer">
            <NavIcon name="external" /><span className="cms-nav__text">Lihat situs</span>
          </a>
          <a className="cms-nav__link" href={`${admin}${payload.config.admin.routes.logout}`}>
            <NavIcon name="logout" /><span className="cms-nav__text">Keluar</span>
          </a>
        </div>
      </nav>
      <div className="nav__header"><div className="nav__header-content"><NavHamburger baseClass="nav" /></div></div>
    </NavWrapper>
  )
}

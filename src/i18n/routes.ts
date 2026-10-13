// Route table for the public site: Indonesian has no prefix, English lives under /en.
// Static segments are localized; content slugs (services, regulations, news) are shared.
import type { Locale } from './config.ts'

export const routeKeys = ['home', 'about', 'services', 'garis', 'regulations', 'news', 'contact'] as const
export type RouteKey = (typeof routeKeys)[number]

const segments: Record<RouteKey, Record<Locale, string>> = {
  home: { id: '', en: '' },
  about: { id: 'tentang-kami', en: 'about' },
  services: { id: 'layanan', en: 'services' },
  garis: { id: 'garis', en: 'garis' },
  regulations: { id: 'regulasi', en: 'regulations' },
  news: { id: 'news', en: 'news' },
  contact: { id: 'hubungi-kami', en: 'contact' },
}

/** Locale of a public pathname: anything under /en is English, the rest Indonesian. */
export function localeFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'id'
}

/** href for a route key in a locale, optionally followed by a slug and/or a hash. */
export function href(locale: Locale, key: RouteKey, slug?: string, hash?: string): string {
  const parts = [locale === 'en' ? 'en' : '', segments[key][locale], slug ?? ''].filter(Boolean)
  return `/${parts.join('/')}${hash ? `#${hash}` : ''}`
}

/**
 * The same page in the other locale: maps the first static segment, keeps the slug,
 * query and hash. Unknown first segments fall back to that locale's home.
 */
export function switchLocalePath(pathname: string, target: Locale, search = '', hash = ''): string {
  const from = localeFromPath(pathname)
  const rest = pathname.split('/').filter(Boolean)
  if (from === 'en') rest.shift()
  const [first = '', ...tail] = rest
  const key = routeKeys.find(k => segments[k][from] === first)
  if (key === undefined) return href(target, 'home')
  return `${href(target, key, tail.join('/') || undefined)}${search}${hash}`
}

/** CMS links are written with Indonesian paths; give English pages the matching /en path. */
export function localizeHref(target: string | null | undefined, locale: Locale): string | undefined {
  if (!target) return undefined
  if (!target.startsWith('/') || locale === 'id' || localeFromPath(target) === 'en') return target
  const [path, hash = ''] = target.split('#')
  const [pathname, query = ''] = path.split('?')
  return switchLocalePath(pathname, 'en', query ? `?${query}` : '', hash ? `#${hash}` : '')
}

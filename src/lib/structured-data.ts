// Schema.org objects built only from content that is visible on the page (PLAN.md: FAQ JSON-LD from the
// shown items). Rendered with components/seo/JsonLd.
import 'server-only'
import type { Locale } from '@/i18n/config'
import { href } from '@/i18n/routes'
import type { Faq, Media, Site } from '@/payload-types'
import { asMedia } from './cms'
import { absoluteUrl, SITE_NAME, siteUrl } from './seo'

const ORG_ID = `${siteUrl}/#organization`
const inLanguage = (locale: Locale) => (locale === 'id' ? 'id-ID' : 'en-US')

/** Plain text of a Lexical rich-text value (paragraphs joined by a blank line). */
export function lexicalText(value: unknown): string {
  const walk = (node: unknown): string => {
    if (!node || typeof node !== 'object') return ''
    const n = node as { text?: string; children?: unknown[]; type?: string }
    if (typeof n.text === 'string') return n.text
    return (n.children ?? []).map(walk).join(n.type === 'list' ? '\n' : '')
  }
  const root = (value as { root?: { children?: unknown[] } } | null)?.root
  return (root?.children ?? []).map(walk).filter(Boolean).join('\n\n').trim()
}

export function organizationLd(site: Site, locale: Locale, description?: string | null) {
  return {
    '@context': 'https://schema.org', '@type': 'Organization', '@id': ORG_ID,
    name: SITE_NAME, legalName: 'PT Ape Gale Indonesia', url: absoluteUrl(href(locale, 'home')),
    logo: absoluteUrl('/brand/apegale-logo.png'), image: absoluteUrl('/brand/og-default.jpg'),
    description: description || undefined,
    email: site.email || undefined, telephone: site.phone || undefined,
    address: site.address ? { '@type': 'PostalAddress', streetAddress: site.address, addressLocality: 'Jakarta Selatan', addressRegion: 'DKI Jakarta', addressCountry: 'ID' } : undefined,
    contactPoint: site.whatsapp ? [{ '@type': 'ContactPoint', contactType: 'customer service', telephone: `+${site.whatsapp.replace(/\D/g, '').replace(/^0/, '62')}`, availableLanguage: ['Indonesian', 'English'] }] : undefined,
    sameAs: site.social?.map(s => s.url) ?? undefined,
  }
}

export function serviceLd(s: { title: string; summary?: string | null; slug: string; image?: unknown }, locale: Locale) {
  const image = asMedia(s.image) as Media | null
  return {
    '@context': 'https://schema.org', '@type': 'Service', name: s.title, description: s.summary || undefined,
    url: absoluteUrl(href(locale, 'services', s.slug)), serviceType: s.title, inLanguage: inLanguage(locale),
    image: image?.url ? absoluteUrl(image.url) : undefined,
    provider: { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, url: siteUrl },
    areaServed: { '@type': 'Country', name: 'Indonesia' },
  }
}

export function articleLd(a: { kind: 'regulations' | 'news'; slug: string; title: string; description?: string | null; published?: string | null; modified?: string | null; image?: unknown }, locale: Locale) {
  const image = asMedia(a.image)
  return {
    '@context': 'https://schema.org', '@type': 'Article', headline: a.title.slice(0, 110), description: a.description || undefined,
    mainEntityOfPage: absoluteUrl(href(locale, a.kind, a.slug)), inLanguage: inLanguage(locale),
    datePublished: a.published || a.modified || undefined, dateModified: a.modified || undefined,
    image: absoluteUrl(image?.url || '/brand/og-default.jpg'),
    author: { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, url: siteUrl },
    publisher: { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, logo: { '@type': 'ImageObject', url: absoluteUrl('/brand/apegale-logo.png') } },
  }
}

export function faqLd(items: Faq[]) {
  const entries = items.map(f => ({ q: f.question, a: lexicalText(f.answer) })).filter(f => f.q && f.a)
  if (!entries.length) return null
  return {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: entries.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}

/** Crumbs as shown in PageHeader; the last one is the current page and needs no item URL. */
export function breadcrumbLd(crumbs: { label: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem', position: i + 1, name: c.label,
      ...(c.href && i < crumbs.length - 1 ? { item: absoluteUrl(c.href) } : {}),
    })),
  }
}

// Page metadata for both locales: canonical, hreflang (id / en / x-default), Open Graph and Twitter card.
// Titles and descriptions come from the CMS (each template picks them); images fall back to
// site.seoDefault.ogImage and then to public/brand/og-default.jpg (scripts/build-og-image.mjs).
import 'server-only'
import type { Metadata } from 'next'
import type { Locale } from '@/i18n/config'
import { href, type RouteKey } from '@/i18n/routes'
import type { Media } from '@/payload-types'
import { asMedia, getSite } from './cms'

export const SITE_NAME = 'Ape Gale Indonesia'
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '')
export const absoluteUrl = (path: string) => `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`

const ogLocale: Record<Locale, string> = { id: 'id_ID', en: 'en_US' }

type PageSeo = {
  locale: Locale
  route: RouteKey
  slug?: string
  title: string
  /** Home uses its title as-is instead of "Title | Ape Gale Indonesia". */
  absoluteTitle?: boolean
  description?: string | null
  image?: unknown
  type?: 'website' | 'article'
  publishedTime?: string | null
  modifiedTime?: string | null
}

function ogImage(media: Media | null) {
  if (!media?.url) return null
  const og = media.sizes?.og
  return og?.url ? { url: og.url, width: og.width ?? undefined, height: og.height ?? undefined, alt: media.alt ?? undefined }
    : { url: media.url, width: media.width ?? undefined, height: media.height ?? undefined, alt: media.alt ?? undefined }
}

export async function pageMetadata(p: PageSeo): Promise<Metadata> {
  const site = await getSite(p.locale)
  const path = href(p.locale, p.route, p.slug)
  const fullTitle = p.absoluteTitle ? p.title : `${p.title} | ${SITE_NAME}`
  const description = p.description || site.seoDefault?.description || undefined
  const image = ogImage(asMedia(p.image)) ?? ogImage(asMedia(site.seoDefault?.ogImage))
    ?? { url: '/brand/og-default.jpg', width: 1200, height: 630, alt: SITE_NAME }
  const other: Locale = p.locale === 'id' ? 'en' : 'id'
  return {
    title: p.absoluteTitle ? { absolute: p.title } : p.title,
    description,
    alternates: {
      canonical: path,
      languages: { id: href('id', p.route, p.slug), en: href('en', p.route, p.slug), 'x-default': href('id', p.route, p.slug) },
    },
    openGraph: {
      type: p.type ?? 'website', siteName: SITE_NAME, url: path, title: fullTitle, description,
      locale: ogLocale[p.locale], alternateLocale: [ogLocale[other]], images: [image],
      ...(p.type === 'article' ? { publishedTime: p.publishedTime ?? undefined, modifiedTime: p.modifiedTime ?? undefined } : {}),
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [image.url] },
  }
}

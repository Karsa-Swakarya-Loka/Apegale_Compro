// Per-locale layout body and metadata, shared by app/(public)/(id) and app/(public)/en.
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import type { Locale } from '@/i18n/config'
import { getSite } from '@/lib/cms'
import { siteUrl } from '@/lib/seo'
import { SiteShell } from '@/components/layout/SiteShell'

export async function localeMetadata(locale: Locale): Promise<Metadata> {
  const site = await getSite(locale)
  const title = site.seoDefault?.title || 'Ape Gale Indonesia'
  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s - ${title}` },
    description: site.seoDefault?.description || undefined,
    icons: { icon: [{ url: '/brand/icon-32.png', sizes: '32x32' }, { url: '/brand/icon-192.png', sizes: '192x192' }], apple: '/brand/apple-touch-icon.png' },
  }
}

export function LocaleLayout({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <SiteShell locale={locale}>{children}</SiteShell>
}

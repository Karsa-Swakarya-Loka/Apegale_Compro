// /sitemap.xml — every public page and published document in both languages, each with its hreflang pair.
// Read per request so publishing in the CMS shows up without a rebuild (and the build needs no database).
import type { MetadataRoute } from 'next'
import { href, type RouteKey } from '@/i18n/routes'
import { getSitemapDocs } from '@/lib/cms'
import { absoluteUrl } from '@/lib/seo'

export const dynamic = 'force-dynamic'

const pages: { key: RouteKey; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
  { key: 'home', priority: 1, changeFrequency: 'weekly' }, { key: 'services', priority: 0.9, changeFrequency: 'monthly' },
  { key: 'about', priority: 0.7, changeFrequency: 'monthly' }, { key: 'garis', priority: 0.7, changeFrequency: 'monthly' },
  { key: 'regulations', priority: 0.6, changeFrequency: 'weekly' }, { key: 'news', priority: 0.6, changeFrequency: 'weekly' },
  { key: 'contact', priority: 0.8, changeFrequency: 'monthly' },
]

function pair(key: RouteKey, slug: string | undefined, extra: Omit<MetadataRoute.Sitemap[number], 'url'>): MetadataRoute.Sitemap {
  const languages = { id: absoluteUrl(href('id', key, slug)), en: absoluteUrl(href('en', key, slug)), 'x-default': absoluteUrl(href('id', key, slug)) }
  return (['id', 'en'] as const).map(locale => ({ url: absoluteUrl(href(locale, key, slug)), alternates: { languages }, ...extra }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { services, regulations, posts } = await getSitemapDocs()
  return [
    ...pages.flatMap(p => pair(p.key, undefined, { priority: p.priority, changeFrequency: p.changeFrequency })),
    ...services.flatMap(d => pair('services', d.slug, { lastModified: d.updatedAt, priority: 0.8, changeFrequency: 'monthly' })),
    ...regulations.flatMap(d => pair('regulations', d.slug, { lastModified: d.updatedAt, priority: 0.5, changeFrequency: 'yearly' })),
    ...posts.flatMap(d => pair('news', d.slug, { lastModified: d.updatedAt, priority: 0.5, changeFrequency: 'yearly' })),
  ]
}

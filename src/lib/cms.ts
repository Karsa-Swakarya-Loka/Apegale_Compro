// Server-side CMS reads for the public site. Only (await onlyPublished()) content leaves this module.
import 'server-only'
import { cache } from 'react'
import { draftMode } from 'next/headers'
import { getPayload, type Where } from 'payload'
import config from '@payload-config'
import type { About, Client, Faq, Garis, Home, Media, Post, Regulation, Service, Site, Testimonial, Ui } from '@/payload-types'
import type { Locale } from '@/i18n/config'

export const payloadClient = cache(() => getPayload({ config }))

// Draft preview (docs/04): an admin opens /preview from the CMS, which turns on Next's draft mode for that
// browser only. Then every read below returns the latest draft; everyone else only ever gets published content.
const isPreview = async () => (await draftMode()).isEnabled
const view = async () => (await isPreview() ? { draft: true, overrideAccess: true } : { draft: false, overrideAccess: false })
const onlyPublished = async (): Promise<Where> => (await isPreview() ? { id: { exists: true } } : { _status: { equals: 'published' } })

// Globals' REST access is staff-only; trusted server reads ask for the (await onlyPublished()) version explicitly.
async function readGlobal<T>(slug: 'site' | 'ui' | 'home', locale: Locale): Promise<T> {
  const payload = await payloadClient()
  return (await payload.findGlobal({ slug, locale, draft: await isPreview(), depth: 1, overrideAccess: true })) as unknown as T
}

export const getSite = cache((locale: Locale) => readGlobal<Site>('site', locale))
export const getUi = cache((locale: Locale) => readGlobal<Ui>('ui', locale))
export const getHome = cache((locale: Locale) => readGlobal<Home>('home', locale))

export type NavService = { slug: string; title: string; children: NavService[] }

/** Published services that belong in the menu, as a tree in CMS order. Public access rules apply. */
export const getMenuServices = cache(async (locale: Locale): Promise<NavService[]> => {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'services', locale, ...(await view()), depth: 0, limit: 200, sort: 'order',
    where: { and: [await onlyPublished(), { showInMenu: { equals: true } }] },
    select: { slug: true, title: true, parent: true, order: true },
  })
  const rows = docs as Pick<Service, 'id' | 'slug' | 'title' | 'parent'>[]
  const parentID = (s: (typeof rows)[number]) => (typeof s.parent === 'object' && s.parent ? s.parent.id : s.parent ?? null)
  const build = (parent: number | null): NavService[] =>
    rows.filter(s => parentID(s) === parent).map(s => ({ slug: s.slug, title: s.title, children: build(s.id) }))
  return build(null)
})

// ---- Home and shared content (step 3) ----

export const getAbout = cache((locale: Locale) => readAnyGlobal<About>('about', locale))
export const getGaris = cache((locale: Locale) => readAnyGlobal<Garis>('garis', locale))
async function readAnyGlobal<T>(slug: 'about' | 'garis', locale: Locale): Promise<T> {
  const payload = await payloadClient()
  return (await payload.findGlobal({ slug, locale, draft: await isPreview(), depth: 1, overrideAccess: true })) as unknown as T
}


export const getClients = cache(async (locale: Locale) => {
  const payload = await payloadClient()
  const { docs } = await payload.find({ collection: 'clients', locale, ...(await view()), depth: 1, limit: 50, sort: 'order', where: (await onlyPublished()) })
  return docs as Client[]
})

export type ServiceCardData = { slug: string; title: string; summary?: string | null; icon?: string | null; children: { slug: string; title: string }[] }
/** Published top-level services in CMS order, each with its (await onlyPublished()) children. */
export const getTopServices = cache(async (locale: Locale): Promise<ServiceCardData[]> => {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'services', locale, ...(await view()), depth: 0, limit: 200, sort: 'order', where: (await onlyPublished()),
    select: { slug: true, title: true, summary: true, icon: true, parent: true },
  })
  const rows = docs as Pick<Service, 'id' | 'slug' | 'title' | 'summary' | 'icon' | 'parent'>[]
  const parentID = (s: (typeof rows)[number]) => (typeof s.parent === 'object' && s.parent ? s.parent.id : s.parent ?? null)
  return rows.filter(s => parentID(s) === null).map(s => ({
    slug: s.slug, title: s.title, summary: s.summary, icon: s.icon,
    children: rows.filter(c => parentID(c) === s.id).map(c => ({ slug: c.slug, title: c.title })),
  }))
})

export const getTestimonials = cache(async (locale: Locale) => {
  const payload = await payloadClient()
  const { docs } = await payload.find({ collection: 'testimonials', locale, ...(await view()), depth: 1, limit: 12, sort: 'order',
    where: { and: [(await onlyPublished()), { consent: { equals: true } }] } })
  return docs as Testimonial[]
})

export const getFeaturedFaqs = cache(async (locale: Locale) => {
  const payload = await payloadClient()
  const { docs } = await payload.find({ collection: 'faqs', locale, ...(await view()), depth: 0, limit: 6, sort: 'order',
    where: { and: [(await onlyPublished()), { featured: { equals: true } }] } })
  return docs as Faq[]
})

export type ArticleCard = { kind: 'post' | 'regulation'; slug: string; title: string; category: string; date?: string | null; cover?: Media | null }
/** Newest (await onlyPublished()) posts and regulations combined (owner decision #21). */
export const getLatestArticles = cache(async (locale: Locale, limit = 3): Promise<ArticleCard[]> => {
  const payload = await payloadClient()
  const [posts, regs] = await Promise.all([
    payload.find({ collection: 'posts', locale, ...(await view()), depth: 1, limit, sort: '-publishedAt', where: (await onlyPublished()) }),
    payload.find({ collection: 'regulations', locale, ...(await view()), depth: 0, limit, sort: '-issuedAt', where: (await onlyPublished()) }),
  ])
  const cards: ArticleCard[] = [
    ...(posts.docs as Post[]).map(p => ({ kind: 'post' as const, slug: p.slug, title: p.title, category: p.category, date: p.publishedAt,
      cover: asMedia(p.cover) })),
    ...(regs.docs as Regulation[]).map(r => ({ kind: 'regulation' as const, slug: r.slug, title: r.title, category: r.category, date: r.issuedAt, cover: null })),
  ]
  return cards.sort((a, b) => String(b.date ?? '').localeCompare(String(a.date ?? ''))).slice(0, limit)
})

/** Payload prefixes media URLs with serverURL; the files are served by this same app, so use the path only. */
function sameOriginPath(url?: string | null): string | null | undefined {
  if (!url || !/^https?:\/\//.test(url)) return url
  const { pathname, search } = new URL(url)
  return pathname.startsWith('/api/media/') ? `${pathname}${search}` : url
}

/** Image fields arrive as an id or a populated Media; only populated ones can render. URLs come back same-origin. */
export function asMedia(value: unknown): Media | null {
  if (!value || typeof value !== 'object' || !('url' in value)) return null
  const media = value as Media
  // A re-uploaded file keeps its filename (e.g. the corrected client logos, 18 Oct 2026), so the URL carries the
  // document's updatedAt: the Next image optimizer, browsers and CDNs then fetch the new file instead of a cached one.
  const version = media.updatedAt ? `?v=${Date.parse(media.updatedAt) || 0}` : ''
  const withVersion = (url: string | null | undefined) => { const p = sameOriginPath(url); return p && version && !p.includes('?') ? p + version : p }
  const sizes = Object.fromEntries(Object.entries(media.sizes ?? {}).map(([k, s]) => [k, s ? { ...s, url: withVersion(s.url) } : s]))
  return { ...media, url: withVersion(media.url), sizes: sizes as Media['sizes'] }
}

// ---- Services pages (step 4) ----
export type ServiceDetail = Service & { parentDoc: { slug: string; title: string } | null; children: { slug: string; title: string; summary?: string | null; icon?: string | null }[] }

/** One (await onlyPublished()) service by slug, with its (await onlyPublished()) parent and children. Drafts return null (→ 404). */
export const getServiceBySlug = cache(async (locale: Locale, slug: string): Promise<ServiceDetail | null> => {
  const payload = await payloadClient()
  const { docs } = await payload.find({ collection: 'services', locale, ...(await view()), depth: 1, limit: 1,
    where: { and: [(await onlyPublished()), { slug: { equals: slug } }] } })
  const doc = docs[0] as Service | undefined
  if (!doc) return null
  const parentID = typeof doc.parent === 'object' && doc.parent ? doc.parent.id : doc.parent
  const [parent, children] = await Promise.all([
    parentID ? payload.find({ collection: 'services', locale, ...(await view()), depth: 0, limit: 1,
      where: { and: [(await onlyPublished()), { id: { equals: parentID } }] }, select: { slug: true, title: true } }) : null,
    payload.find({ collection: 'services', locale, ...(await view()), depth: 0, limit: 50, sort: 'order',
      where: { and: [(await onlyPublished()), { parent: { equals: doc.id } }] }, select: { slug: true, title: true, summary: true, icon: true } }),
  ])
  const p = parent?.docs[0] as Pick<Service, 'slug' | 'title'> | undefined
  return {
    ...doc,
    parentDoc: p ? { slug: p.slug, title: p.title } : null,
    children: (children.docs as Pick<Service, 'slug' | 'title' | 'summary' | 'icon'>[]).map(c => ({ slug: c.slug, title: c.title, summary: c.summary, icon: c.icon })),
  }
})

/** Published FAQs for a category, or linked to a service. */
export const getFaqs = cache(async (locale: Locale, filter: { category?: Faq['category']; serviceId?: number }) => {
  const payload = await payloadClient()
  const conditions: Where[] = [(await onlyPublished())]
  if (filter.category) conditions.push({ category: { equals: filter.category } })
  if (filter.serviceId) conditions.push({ services: { in: [filter.serviceId] } })
  const { docs } = await payload.find({ collection: 'faqs', locale, ...(await view()), depth: 0, limit: 8, sort: 'order', where: { and: conditions } })
  return docs as Faq[]
})

export type PriceRow = { id: string; service: string; serviceSlug: string; name: string; note?: string | null; duration?: string | null; priceFrom?: number | null; featured?: boolean | null }
/** Featured price rows across (await onlyPublished()) services (Layanan index price list). */
export const getFeaturedPrices = cache(async (locale: Locale): Promise<PriceRow[]> => {
  const payload = await payloadClient()
  const { docs } = await payload.find({ collection: 'services', locale, ...(await view()), depth: 0, limit: 200, sort: 'order', where: (await onlyPublished()),
    select: { slug: true, title: true, priceItems: true } })
  return (docs as Pick<Service, 'slug' | 'title' | 'priceItems'>[]).flatMap(s => (s.priceItems ?? []).filter(p => p.featured).map((p, i) => ({
    id: p.id || `${s.slug}-${i}`, service: s.title, serviceSlug: s.slug, name: p.name, note: p.note, duration: p.duration, priceFrom: p.priceFrom, featured: p.featured,
  })))
})

// ---- Regulations & News (step 7) ----
export const PAGE_SIZE = 9
type ListArgs = { category?: string; page?: number }

export const getRegulations = cache(async (locale: Locale, { category, page = 1 }: ListArgs) => {
  const payload = await payloadClient()
  const where: Where = category ? { and: [(await onlyPublished()), { category: { equals: category } }] } : (await onlyPublished())
  return payload.find({ collection: 'regulations', locale, ...(await view()), depth: 1, limit: PAGE_SIZE, page,
    sort: ['-issuedAt', 'createdAt'], where }) as unknown as Promise<{ docs: Regulation[]; totalPages: number; page: number; totalDocs: number }>
})

export const getPosts = cache(async (locale: Locale, { category, page = 1 }: ListArgs) => {
  const payload = await payloadClient()
  const where: Where = category ? { and: [(await onlyPublished()), { category: { equals: category } }] } : (await onlyPublished())
  return payload.find({ collection: 'posts', locale, ...(await view()), depth: 1, limit: PAGE_SIZE, page,
    sort: ['-publishedAt', '-createdAt'], where }) as unknown as Promise<{ docs: Post[]; totalPages: number; page: number; totalDocs: number }>
})

export const getRegulationBySlug = cache(async (locale: Locale, slug: string) => {
  const payload = await payloadClient()
  const { docs } = await payload.find({ collection: 'regulations', locale, ...(await view()), depth: 1, limit: 1,
    where: { and: [(await onlyPublished()), { slug: { equals: slug } }] } })
  return (docs[0] as Regulation | undefined) ?? null
})

export const getPostBySlug = cache(async (locale: Locale, slug: string) => {
  const payload = await payloadClient()
  const { docs } = await payload.find({ collection: 'posts', locale, ...(await view()), depth: 1, limit: 1,
    where: { and: [(await onlyPublished()), { slug: { equals: slug } }] } })
  return (docs[0] as Post | undefined) ?? null
})

/**
 * A service that exists but is not (await onlyPublished()) yet (legacy URLs point at several). Returns the closest
 * (await onlyPublished()) ancestor's slug, null for the services index, or undefined when the slug is unknown (→ 404).
 */
export const getUnpublishedServiceFallback = cache(async (slug: string): Promise<string | null | undefined> => {
  const payload = await payloadClient()
  const all = (await payload.find({ collection: 'services', overrideAccess: true, depth: 0, limit: 200, pagination: false,
    select: { slug: true, parent: true, _status: true } })).docs as Pick<Service, 'id' | 'slug' | 'parent' | '_status'>[]
  type Row = (typeof all)[number]
  const byId = new Map(all.map(s => [s.id, s]))
  let current: Row | undefined = all.find(s => s.slug === slug)
  if (!current) return undefined
  for (let hops = 0; hops < 10; hops++) {
    const parentID: number | null | undefined = typeof current.parent === 'object' && current.parent ? current.parent.id : current.parent
    const parent: Row | undefined = parentID ? byId.get(parentID) : undefined
    if (!parent) return null
    if (parent._status === 'published') return parent.slug
    current = parent
  }
  return null
})

// ---- SEO (step 9) ----
export type SitemapDoc = { slug: string; updatedAt: string }

/** Every published service, regulation and post, for sitemap.xml. */
export const getSitemapDocs = cache(async () => {
  const payload = await payloadClient()
  const read = async (collection: 'services' | 'regulations' | 'posts') =>
    (await payload.find({ collection, draft: false, overrideAccess: false, depth: 0, limit: 1000, pagination: false, where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true } })).docs as SitemapDoc[]
  const [services, regulations, posts] = await Promise.all([read('services'), read('regulations'), read('posts')])
  return { services, regulations, posts }
})

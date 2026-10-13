// Pushes the copy fields of content/seed/*.json into the CMS for both locales WITHOUT touching anything else
// (status, bodies, media, relations stay as they are). Use it after editing copy in the seed files.
// Covered: service title/summary (by slug), globals ui (all labels), site.seoDefault, home.hero texts, home.why, home.network title/text,
// about vision/mission/values, garis intro/variants/features.
// Run with the dev server stopped (SQLite lock): npm run content:copy
import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import { getPayload } from 'payload'
import type { GlobalSlug } from 'payload'
import config from '../src/payload.config.ts'
import type { Locale } from '../src/i18n/config.ts'

const locales: Locale[] = ['id', 'en']
const seed = async (name: string) => JSON.parse(await readFile(`content/seed/${name}.json`, 'utf8'))
type Localized = { id?: string; en?: string } | string | undefined
const pick = (v: Localized, locale: Locale) => (typeof v === 'object' && v ? v[locale] ?? '' : v ?? '')
/** Localizes every leaf {id,en} object in a plain structure; other values pass through. */
function localize(value: unknown, locale: Locale): unknown {
  if (Array.isArray(value)) return value.map(v => localize(v, locale))
  if (value && typeof value === 'object') {
    const o = value as Record<string, unknown>
    if ('id' in o && 'en' in o && Object.keys(o).length === 2) return o[locale]
    return Object.fromEntries(Object.entries(o).filter(([k]) => !k.startsWith('_')).map(([k, v]) => [k, localize(v, locale)]))
  }
  return value
}

const payload = await getPayload({ config })
const rows: { target: string; locale: Locale; result: string }[] = []
try {
  const services = await seed('services') as { slug: string; title: Localized; summary: Localized }[]
  for (const s of services) for (const locale of locales) {
    const { docs } = await payload.find({ collection: 'services', where: { slug: { equals: s.slug } }, locale, draft: true, depth: 0, limit: 1, overrideAccess: true })
    if (!docs[0]) { rows.push({ target: `services/${s.slug}`, locale, result: 'missing' }); continue }
    await payload.update({ collection: 'services', id: docs[0].id, locale, depth: 0, overrideAccess: true, draft: docs[0]._status !== 'published',
      data: { title: pick(s.title, locale), summary: pick(s.summary, locale) } })
    rows.push({ target: `services/${s.slug}`, locale, result: docs[0]._status === 'published' ? 'published copy updated' : 'draft copy updated' })
  }

  const ui = await seed('ui-dictionary'), site = await seed('site'), home = await seed('home'), about = await seed('about'), garis = await seed('garis')
  const globals: { slug: GlobalSlug; data: (locale: Locale) => Record<string, unknown> }[] = [
    { slug: 'ui', data: locale => localize(ui, locale) as Record<string, unknown> },
    { slug: 'site', data: locale => ({ seoDefault: { title: pick(site.seoDefault.title, locale), description: pick(site.seoDefault.description, locale) } }) },
    { slug: 'home', data: locale => ({
      hero: { eyebrow: pick(home.hero.eyebrow, locale), headline: pick(home.hero.headline, locale), highlight: pick(home.hero.highlight, locale), lead: pick(home.hero.lead, locale),
        primaryCta: { label: pick(home.hero.primaryCta.label, locale), href: home.hero.primaryCta.href }, secondaryCta: { label: pick(home.hero.secondaryCta.label, locale), href: home.hero.secondaryCta.href || null } },
      network: { title: pick(home.network.title, locale), text: pick(home.network.text, locale) },
    }) },
    { slug: 'about', data: locale => ({ vision: pick(about.vision, locale), mission: (about.mission as Localized[]).map(m => ({ text: pick(m, locale) })) }) },
    { slug: 'garis', data: locale => ({ intro: pick(garis.intro, locale) }) },
  ]
  for (const g of globals) for (const locale of locales) {
    const current = await payload.findGlobal({ slug: g.slug, locale, draft: true, depth: 0, overrideAccess: true })
    const data = g.data(locale)
    // Arrays with localized fields keep their row ids so the EN write lands on the same rows.
    if (g.slug === 'about') {
      const values = (current as { values?: { id?: string | null }[] }).values ?? []
      const seedValues = about.values as { title: Localized; text: Localized }[]
      data.values = seedValues.map((v, i) => ({ id: values[i]?.id, title: pick(v.title, locale), text: pick(v.text, locale) }))
    }
    if (g.slug === 'garis') {
      const variants = (current as { variants?: { id?: string | null; image?: unknown }[] }).variants ?? []
      const features = (current as { features?: { id?: string | null }[] }).features ?? []
      data.variants = (garis.variants as { name: string; text: Localized }[]).map((v, i) => ({ id: variants[i]?.id, name: v.name, text: pick(v.text, locale), image: variants[i]?.image ?? null }))
      data.features = (garis.features as { title: Localized; text?: Localized }[]).map((f, i) => ({ id: features[i]?.id, title: pick(f.title, locale), text: pick(f.text, locale) || null }))
    }
    if (g.slug === 'home') {
      const why = (current as { why?: { id?: string | null }[] }).why ?? []
      const seedWhy = (home.why as { icon: string; title: Localized; text: Localized }[])
      if (why.length === seedWhy.length) data.why = seedWhy.map((w, i) => ({ id: why[i].id, icon: w.icon, title: pick(w.title, locale), text: pick(w.text, locale) }))
    }
    await payload.updateGlobal({ slug: g.slug, locale, depth: 0, overrideAccess: true, data })
    rows.push({ target: `globals/${g.slug}`, locale, result: 'updated' })
  }
  console.table(rows)
} finally { await payload.destroy() }
// The Postgres pool can outlive destroy(); exit explicitly so scripts never hang.
process.exit(process.exitCode ?? 0)

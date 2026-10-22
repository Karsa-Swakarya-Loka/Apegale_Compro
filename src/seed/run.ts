import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { Locale } from '../i18n/config.ts'
import { mediaAlt, retiredServices, seedFiles } from './manifest.ts'
import { alignArrayIDs, atPath, list, normalizeFaq, normalizeGlobal, normalizeService, object } from './normalize.ts'
import type { Data } from './normalize.ts'
import type { SeedCollection, SeedStore } from './store.ts'

export async function runSeed(store: SeedStore, root: string, overwrite = false) {
 const sources = Object.fromEntries(await Promise.all(seedFiles.map(async name => [name, JSON.parse(await readFile(path.join(root, 'content/seed', name + '.json'), 'utf8'))])))
 const mediaIDs = new Map<string, number | string>()
 const serviceIDs = new Map<string, number | string>()
 async function upsert(collection: SeedCollection, key: string, value: string, data: (locale: Locale) => Data, marker: string, filePath?: string) {
  let idDoc = await store.find(collection, key, value, 'id')
  if (!idDoc) idDoc = await store.create(collection, data('id'), 'id', filePath)
  else if (overwrite) idDoc = await store.update(collection, idDoc.id as number | string, object(alignArrayIDs(data('id'), idDoc)), 'id')
  const enDoc = await store.find(collection, key, value, 'en')
  // Shared-only collections also have a marker so they need no duplicate locale documents.
  if (overwrite || !enDoc || !atPath(enDoc, marker)) {
   await store.update(collection, idDoc.id as number | string, object(alignArrayIDs(data('en'), idDoc)), 'en')
  }
  return idDoc.id as number | string
 }
 for (const [source, alt] of Object.entries(mediaAlt)) {
  const filename = path.resolve(root, source)
  if (!filename.startsWith(path.resolve(root, 'design/assets') + path.sep)) throw new Error('Seed media outside design/assets')
  const id = await upsert('media', 'seedKey', source, locale => ({ seedKey: source, alt: alt[locale], enReviewed: false, _status: 'published' }), 'alt', filename)
  mediaIDs.set(source, id)
 }
 // Retired services go first so a child never outlives its removal from the seed.
 for (const slug of retiredServices) {
  const doc = await store.find('services', 'slug', slug, 'id')
  if (doc) await store.delete('services', doc.id as number | string)
 }
 for (const raw of list(sources.services)) {
  const slug = String(raw.slug)
  serviceIDs.set(slug, await upsert('services', 'slug', slug, locale => normalizeService(raw, locale), 'title'))
 }
 // Relations resolve only after every service exists, and never create extra services.
 for (const raw of list(sources.services)) if (raw.parent) {
  const parent = serviceIDs.get(String(raw.parent))
  if (parent == null) throw new Error('Unknown service parent ' + raw.parent)
  const current = await store.find('services', 'slug', String(raw.slug), 'id')
  if (overwrite || !current?.parent) await store.update('services', serviceIDs.get(String(raw.slug))!, { parent }, 'id')
 }
 for (const raw of list(sources.clients)) {
  await upsert('clients', 'name', String(raw.name), () => ({ ...raw, logo: raw.logo ? mediaIDs.get(String(raw.logo)) : null, _status: 'published', enReviewed: false }), 'name')
 }
 for (const [i, raw] of list(sources.faqs).entries()) {
  const idData = normalizeFaq(raw, 'id', i)
  await upsert('faqs', 'seedKey', String(idData.seedKey), locale => normalizeFaq(raw, locale, i), 'question')
 }
 const markers: Record<string, string> = { site: 'seoDefault.title', home: 'hero.headline', about: 'vision', garis: 'intro', ui: 'nav.home' }
 for (const name of ['site','home','about','garis','ui']) {
  const raw = object(sources[name === 'ui' ? 'ui-dictionary' : name])
  let idDoc = await store.global(name, 'id')
  if (overwrite || !atPath(idDoc, markers[name])) idDoc = await store.updateGlobal(name, object(alignArrayIDs(normalizeGlobal(name, raw, 'id', mediaIDs), idDoc)), 'id')
  const enDoc = await store.global(name, 'en')
  if (overwrite || !atPath(enDoc, markers[name])) await store.updateGlobal(name, object(alignArrayIDs(normalizeGlobal(name, raw, 'en', mediaIDs), idDoc)), 'en')
 }
 return { services: serviceIDs.size, media: mediaIDs.size, clients: list(sources.clients).length, faqs: list(sources.faqs).length, globals: 5 }
}


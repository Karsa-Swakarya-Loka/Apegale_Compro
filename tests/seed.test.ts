import assert from 'node:assert/strict'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'
import { runSeed } from '../src/seed/run.ts'
import { alignArrayIDs, normalizeGlobal, normalizeService, object } from '../src/seed/normalize.ts'
import type { Data } from '../src/seed/normalize.ts'
import type { SeedCollection, SeedStore } from '../src/seed/store.ts'
import type { Locale } from '../src/i18n/config.ts'
const root = fileURLToPath(new URL('../', import.meta.url))
class MemoryStore implements SeedStore {
 rows = new Map<string, { id: number; shared: Data; idData: Data; enData: Data }[]>()
 globals = new Map<string, Partial<Record<Locale, Data>>>()
 nextID = 1
 failEnglishOnce = false
 shared(data: Data) { return Object.fromEntries(Object.entries(data).filter(([key]) => ['slug','name','seedKey','parent','enReviewed','_status','order','logo'].includes(key))) }
 async find(collection: SeedCollection, key: string, value: string, locale: Locale): Promise<Data | undefined> {
  const row = this.rows.get(collection)?.find(r => r.shared[key] === value)
  return row ? structuredClone({ ...row.shared, ...(locale === 'id' ? row.idData : row.enData), id: row.id }) : undefined
 }
 async create(collection: SeedCollection, data: Data, locale: Locale, filePath?: string): Promise<Data> {
  if (filePath) await readFile(filePath)
  const row = { id: this.nextID++, shared: this.shared(data), idData: {}, enData: {} }
  row[locale === 'id' ? 'idData' : 'enData'] = structuredClone(data)
  const rows = this.rows.get(collection) || []; rows.push(row); this.rows.set(collection, rows)
  return { ...data, id: row.id }
 }
 async update(collection: SeedCollection, id: number | string, data: Data, locale: Locale) {
  if (locale === 'en' && this.failEnglishOnce) { this.failEnglishOnce = false; throw new Error('Simulated interrupted English write') }
  const row = this.rows.get(collection)!.find(r => r.id === id)!
  row.shared = { ...row.shared, ...this.shared(data) }
  const key = locale === 'id' ? 'idData' : 'enData'
  row[key] = { ...row[key], ...structuredClone(data) }
  return { ...row.shared, ...row[key], id }
 }
 async global(slug: string, locale: Locale) { return structuredClone(this.globals.get(slug)?.[locale] || {}) }
 async updateGlobal(slug: string, data: Data, locale: Locale) {
  const current = this.globals.get(slug) || {}; current[locale] = structuredClone(data); this.globals.set(slug, current); return data
 }
}

test('seed twice: stable identities, bilingual content, exact client count, no invented content', async () => {
 const store = new MemoryStore()
 const first = await runSeed(store, root)
 const snapshot = JSON.stringify([...store.rows])
 assert.deepEqual(await runSeed(store, root), first)
 assert.equal(JSON.stringify([...store.rows]), snapshot)
 assert.deepEqual(first, { services: 16, media: 15, clients: 11, faqs: 5, globals: 5 })
 const service = await store.find('services','slug','legalitas-perusahaan','en')
 assert.equal(service?.title, 'Company Legalities')
 assert.equal(service?._status, 'draft')
 assert.equal(service?.body, undefined)
 const child = await store.find('services','slug','vitas','id')
 const parent = await store.find('services','slug','visa-paspor','id')
 assert.equal(child?.parent, parent?.id)
 const home = await store.global('home','id')
 assert.equal(object(home.founder).quote, undefined)
 assert.equal((object(home.network).cities as Data[]).length, 13)
 // Editorial copy follows the bilingual seed, including the owner-approved paraphrase.
 const homeSeed = JSON.parse(await readFile(new URL('../content/seed/home.json', import.meta.url), 'utf8'))
 assert.equal(object(home.hero).lead, homeSeed.hero.lead.id)
 assert.equal(object((await store.global('home','en')).hero).lead, homeSeed.hero.lead.en)
 const garis = await store.global('garis','en')
 assert.equal(garis.enabled, false); assert.equal((garis.gallery as Data[]).length, 2); assert.deepEqual(garis.features, [])
 const about = await store.global('about','id')
 assert.equal((about.organigram as Data[])[0].name, 'Deny Yandi Imran')
 assert.equal((about.organigram as Data[])[1].parentIndex, 0)
 assert.equal(about._status, 'published')
 assert.equal((await store.global('ui','en')).nav != null, true)
 assert.match(String((await store.global('site','id')).mapsUrl), /Ciputra/)
 assert.equal(store.rows.has('testimonials'), false)
})

test('rerun repairs an interrupted second locale without duplicate uploads', async () => {
 const store = new MemoryStore(); store.failEnglishOnce = true
 await assert.rejects(runSeed(store, root), /interrupted English/)
 await runSeed(store, root)
 assert.equal(store.rows.get('media')?.length, 15)
 const photo = await store.find('media','seedKey','design/assets/Photography/hero-meeting-city.jpg','en')
 assert.match(String(photo?.alt), /^Four people/)
})

test('normal rerun preserves CMS edits; explicit overwrite restores managed seed fields', async () => {
 const store = new MemoryStore(); await runSeed(store, root)
 const faq = await store.find('faqs','seedKey','faq-garis','en')
 await store.update('faqs',faq!.id as number,{ question: 'Edited by an editor', enReviewed: true },'en')
 const home = await store.global('home','en'); object(home.hero).headline = 'Edited heading'; await store.updateGlobal('home',home,'en')
 await runSeed(store, root)
 assert.equal((await store.find('faqs','seedKey','faq-garis','en'))?.question, 'Edited by an editor')
 assert.equal(object((await store.global('home','en')).hero).headline, 'Edited heading')
 await runSeed(store, root, true)
 assert.equal((await store.find('faqs','seedKey','faq-garis','en'))?.question, 'What is the GARIS app?')
})

test('nonlocalized array IDs survive locale writes; localized arrays stay independent', () => {
 assert.deepEqual(alignArrayIDs({ why: [{ title: 'English' }], mission: [{ text: 'English' }] }, { why: [{ id: 'row-1' }], mission: [{ id: 'local-row' }] }),
 { why: [{ title: 'English', id: 'row-1' }], mission: [{ text: 'English' }] })
})

test('legacy instructions are never published as body and invalid city coordinates fail', () => {
 const data = normalizeService({ slug: 'example', title: { id: 'ID', en: 'EN' }, body: { source: 'legacy/example.html', note: 'migration' } }, 'en')
 assert.equal(data.body, undefined); assert.equal(data._status, 'draft')
 assert.throws(() => normalizeGlobal('home', { hero: { image: 'a' }, founder: { photo: 'a' }, network: { cities: [{ name: 'Unknown', lat: 100, lng: 0 }] } }, 'id', new Map([['a',1]])), /coordinates/)
})

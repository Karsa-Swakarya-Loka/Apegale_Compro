import 'dotenv/config'
import assert from 'node:assert/strict'
import { getPayload } from 'payload'
import type { PayloadRequest } from 'payload'
import config from '../src/payload.config.ts'
import { runSeed } from '../src/seed/run.ts'
import { payloadStore } from '../src/seed/store.ts'
import { reportCounts } from '../src/seed/report.ts'

// Run only on a fresh dedicated development/QA database, after migrations.
const payload = await getPayload({ config })
try {
 const store = payloadStore(payload)
 await runSeed(store, process.cwd())
 const first = await reportCounts(payload)
 await runSeed(store, process.cwd())
 const second = await reportCounts(payload)
 assert.deepEqual(second, first, 'Second seed changed document counts')
 // After npm run content:regulations there are 44 regulations, each with one PDF in media (step 7).
 const regulations = second.find(r => r.collection === 'regulations')?.documents ?? 0
 assert.ok([0, 44].includes(regulations), `regulations: ${regulations}`)
 for (const locale of ['id','en'] as const) {
  for (const [collection, expected] of Object.entries({ services:16, clients:11, faqs:5, media:15 + regulations, testimonials:0, posts:0, regulations, inquiries:0 }))
   assert.equal(second.find(r => r.collection === collection && r.locale === locale)?.documents, expected, collection + '/' + locale)
  const services = await payload.find({ collection:'services', locale, fallbackLocale:false, draft:true, limit:100, depth:0, overrideAccess:true })
  assert.equal(new Set(services.docs.map(d => d.slug)).size, 16)
  // Every service has a title; after content:services the bodies are filled and only the approved set is published.
  assert.ok(services.docs.every(d => d.title))
  const legal = services.docs.find(d => d.slug === 'legalitas-perusahaan')
  assert.equal(legal?.title, locale === 'id' ? 'Legalitas Perusahaan' : 'Company Legalities')
  const faq = await store.find('faqs','seedKey','faq-garis',locale)
  assert.equal(faq?.question, locale === 'id' ? 'Apa itu aplikasi GARIS?' : 'What is the GARIS app?')
  // Public reads never expose drafts, even when asking for draft:true.
  const publicServices = await payload.find({ collection:'services', locale, draft:true, overrideAccess:false, limit:100 })
  const draftSlugs = new Set(services.docs.filter(d => d._status !== 'published').map(d => d.slug))
  assert.ok(publicServices.docs.every(d => !draftSlugs.has(d.slug)), 'Public draft leak')
  const clients = await payload.find({ collection:'clients', locale, overrideAccess:false, limit:100 })
  assert.equal(clients.totalDocs, 11)
 }
 const editor = { id: 0, email: 'qa-editor@example.invalid', role: 'editor', collection: 'users' } as NonNullable<PayloadRequest['user']>
 await assert.rejects(payload.find({ collection:'inquiries', user:editor, overrideAccess:false }))
 await assert.rejects(payload.find({ collection:'users', user:editor, overrideAccess:false }))
 await assert.rejects(payload.updateGlobal({ slug:'site', data:{ phone:'must-not-be-written' }, user:editor, overrideAccess:false }))
 await assert.rejects(payload.findGlobal({ slug:'home', draft:true, overrideAccess:false }))
 await assert.rejects(payload.create({ collection:'testimonials', locale:'id', data:{ name:'Validation test', company:'Test', consent:false, _status:'published' }, overrideAccess:true }))
 console.table(second)
 console.log('CMS integration checks passed on this database.')
} finally { await payload.destroy() }
// The Postgres pool can outlive destroy(); exit explicitly so scripts never hang.
process.exit(process.exitCode ?? 0)

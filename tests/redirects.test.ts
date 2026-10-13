import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { legacyRedirects } from '../src/lib/legacy-redirects.ts'

const pdfMap = JSON.parse(readFileSync(new URL('../content/seed/legacy-pdf-redirects.json', import.meta.url), 'utf8'))
const all = legacyRedirects(pdfMap)

test('every redirect is a 301 with a unique source', () => {
  assert.ok(all.every(r => r.statusCode === 301))
  assert.equal(new Set(all.map(r => r.source)).size, all.length)
})

test('every old URL in the docs/02 table is covered, with and without its slash', () => {
  const doc = readFileSync(new URL('../docs/02-sitemap-dan-template.md', import.meta.url), 'utf8')
  const table = doc.slice(doc.indexOf('## Redirect 301'), doc.indexOf('## Sumber isi'))
  const olds = [...table.matchAll(/^\| (.+?) \|/gm)].flatMap(m => [...m[1].matchAll(/`(\/[^`]+\/)`/g)].map(x => x[1]))
  assert.ok(olds.length >= 30, `parsed ${olds.length} old URLs`)
  const sources = new Set(all.map(r => r.source))
  // /news/ and /hubungi-kami/ keep their path: proxy.ts strips the slash with a 301 (a redirect here would loop).
  for (const old of olds.filter(o => !['/news/', '/hubungi-kami/'].includes(o))) {
    assert.ok(sources.has(old), `missing ${old}`)
    assert.ok(sources.has(old.replace(/\/$/, '')), `missing ${old} without slash`)
  }
})

test('targets are new public routes or migrated media files', () => {
  const ok = /^\/(en(\/(about|services|garis|regulations|news|contact)(\/[a-z0-9-]+)?)?|tentang-kami|layanan(\/[a-z0-9-]+)?|garis|regulasi|news|hubungi-kami|api\/media\/file\/[^/]+)([?#].*)?$/
  for (const r of all) assert.match(r.destination, ok, r.source)
  assert.equal(all.filter(r => r.source.startsWith('/wp-content/')).length, Object.keys(pdfMap).length)
})

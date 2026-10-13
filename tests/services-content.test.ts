import assert from 'node:assert/strict'
import test from 'node:test'
import { readFile } from 'node:fs/promises'
import { toLexical, validateContent, type ServicesContentFile } from '../src/seed/services-content.ts'

const file = JSON.parse(await readFile(new URL('../content/seed/services-content.json', import.meta.url), 'utf8')) as ServicesContentFile

test('services content: all 16 services, parallel ID/EN, drafts carry a verify note', () => {
  assert.deepEqual(validateContent(file), [])
  assert.equal(Object.keys(file.services).length, 16)
})

test('services content: only general descriptions are published (decisions #7, #20)', () => {
  const published = Object.entries(file.services).filter(([, c]) => c.status === 'published').map(([slug]) => slug).sort()
  assert.deepEqual(published, ['airport-escort', 'all-in-one-solutions', 'broad-expatriate-hosting', 'expatriate-formalities', 'hr-system-consulting', 'legalitas-perusahaan', 'manpower-supply'])
})

test('toLexical builds paragraphs, headings, bullet lists and bold text', () => {
  const doc = toLexical([{ p: 'A **bold** word' }, { h2: 'Title' }, { ul: ['one', 'two'] }])
  const [p, h, list] = doc.root.children as Array<Record<string, unknown> & { children: Array<Record<string, unknown>> }>
  assert.equal(p.type, 'paragraph')
  assert.deepEqual(p.children.map(c => [c.text, c.format]), [['A ', 0], ['bold', 1], [' word', 0]])
  assert.equal(h.type, 'heading'); assert.equal(h.tag, 'h2')
  assert.equal(list.type, 'list'); assert.equal(list.children.length, 2); assert.equal(list.children[1].value, 2)
})

test('validateContent reports mismatched structure', () => {
  const bad: ServicesContentFile = { services: { x: { status: 'draft', source: 's', id: [{ p: 'a' }, { ul: ['1'] }], en: [{ p: 'a' }] } } }
  const problems = validateContent(bad)
  assert.ok(problems.some(p => p.includes('structure differs')))
  assert.ok(problems.some(p => p.includes('verify')))
})

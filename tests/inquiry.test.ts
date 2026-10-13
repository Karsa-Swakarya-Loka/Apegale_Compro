import assert from 'node:assert/strict'
import test from 'node:test'
import { createRateLimiter, duplicateKey, readInquiry, validateInquiry, type InquiryInput } from '../src/lib/inquiry.ts'

const services = ['airport-escort', 'manpower-supply']
const base: InquiryInput = { variant: 'full', name: 'Rina', company: '', email: 'rina@contoh.co.id', whatsapp: '0812 3456 7890', service: 'airport-escort', message: 'Kami butuh penjemputan VIP minggu depan.', website: '' }

test('valid full and compact inquiries pass', () => {
  assert.deepEqual(validateInquiry(base, services), {})
  assert.deepEqual(validateInquiry({ ...base, variant: 'compact', email: '' }, services), {})
})

test('required fields, email only on the full form (decision #19)', () => {
  const e = validateInquiry({ ...base, name: '', whatsapp: '', service: '', message: '', email: '' }, services)
  assert.deepEqual(e, { name: 'required', whatsapp: 'required', service: 'required', message: 'required', email: 'required' })
  assert.equal(validateInquiry({ ...base, variant: 'compact', email: '' }, services).email, undefined)
})

test('format and length rules', () => {
  const e = validateInquiry({ ...base, email: 'rina@', whatsapp: 'abc', service: 'kitas-kitap', message: 'pendek', company: 'x'.repeat(151) }, services)
  assert.deepEqual(e, { email: 'email', whatsapp: 'phone', service: 'service', message: 'tooShort', company: 'tooLong' })
  assert.equal(validateInquiry({ ...base, message: 'x'.repeat(2001) }, services).message, 'tooLong')
})

test('readInquiry trims values and defaults to the full variant', () => {
  const f = new FormData(); f.set('name', '  Rina  '); f.set('variant', 'weird'); f.set('website', ' ')
  const r = readInquiry(f)
  assert.equal(r.name, 'Rina'); assert.equal(r.variant, 'full'); assert.equal(r.website, '')
})

test('rate limiter allows 5 per window per key', () => {
  const allow = createRateLimiter(5, 1000)
  const results = Array.from({ length: 6 }, () => allow('1.2.3.4', 0))
  assert.deepEqual(results, [true, true, true, true, true, false])
  assert.equal(allow('5.6.7.8', 0), true)
  assert.equal(allow('1.2.3.4', 1001), true)
})

test('duplicate key ignores spacing and phone formatting', () => {
  assert.equal(duplicateKey(base), duplicateKey({ ...base, whatsapp: '0812-3456-7890', message: '  Kami butuh  penjemputan VIP minggu depan.' }))
})

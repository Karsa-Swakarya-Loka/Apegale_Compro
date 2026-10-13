import assert from 'node:assert/strict'
import test from 'node:test'
import { isStaff, publishedOrStaff, adminOnly } from '../src/lib/access.ts'
import { hasConsentForStatus, emailRequired, httpUrl } from '../src/lib/validation.ts'
import { Services } from '../src/collections/Services.ts'
import { Testimonials } from '../src/collections/Testimonials.ts'
import { Clients } from '../src/collections/Clients.ts'
import { Faqs } from '../src/collections/Faqs.ts'
import { Posts } from '../src/collections/Posts.ts'
import { Regulations } from '../src/collections/Regulations.ts'
import { Inquiries } from '../src/collections/Inquiries.ts'
import { Users } from '../src/collections/Users.ts'
import { Site } from '../src/globals/Site.ts'
import { Home } from '../src/globals/Home.ts'
import { About } from '../src/globals/About.ts'
import { Garis } from '../src/globals/Garis.ts'
import { Ui } from '../src/globals/Ui.ts'
import type { Field } from 'payload'

/** Data fields at one level: unnamed tabs, rows and collapsibles are layout only and are looked through. */
const dataFields = (fields: Field[]): Field[] => fields.flatMap(f =>
 f.type === 'tabs' ? f.tabs.flatMap(t => ('name' in t && t.name) ? [] : dataFields(t.fields))
 : (f.type === 'row' || f.type === 'collapsible') ? dataFields(f.fields) : [f])
const has = (fields: Field[], name: string) => dataFields(fields).some(f => 'name' in f && f.name === name)

test('public collections restrict reads to published and protect writes', () => {
 for (const collection of [Services,Testimonials,Clients,Faqs,Posts,Regulations]) {
  assert.equal(collection.access?.read, publishedOrStaff)
  assert.deepEqual(collection.versions, { drafts: true })
  assert.ok(has(collection.fields, 'enReviewed'))
 }
 assert.deepEqual(publishedOrStaff({ req: { user: null } } as Parameters<typeof publishedOrStaff>[0]), { _status: { equals: 'published' } })
 assert.equal(publishedOrStaff({ req: { user: { role: 'editor' } } } as Parameters<typeof publishedOrStaff>[0]), true)
 assert.equal(adminOnly({ req: { user: { role: 'editor' } } } as Parameters<typeof adminOnly>[0]), false)
 assert.equal(adminOnly({ req: { user: { role: 'admin' } } } as Parameters<typeof adminOnly>[0]), true)
 assert.equal(isStaff(null), false); assert.equal(isStaff({ role: 'unknown' }), false)
 assert.equal(isStaff({ role: 'editor' }), true); assert.equal(isStaff({ role: 'admin' }), true)
 assert.equal(Inquiries.access?.read, adminOnly); assert.equal(typeof Inquiries.access?.create, 'function'); assert.equal((Inquiries.access?.create as () => boolean)(), false)
 assert.equal(Users.access?.update, adminOnly); assert.equal(Site.access?.update, adminOnly)
})

test('consent required on publishing and cannot be revoked while published', () => {
 assert.equal(hasConsentForStatus('published', false), false)
 assert.equal(hasConsentForStatus('published', true), true)
 assert.equal(hasConsentForStatus('draft', false), true)
})

test('form variants and URL validation match owner decisions', () => {
 assert.equal(emailRequired('full', ''), false)
 assert.equal(emailRequired('compact', undefined), true)
 assert.equal(emailRequired('full', 'user@example.com'), true)
 assert.notEqual(httpUrl('javascript:alert(1)'), true)
 assert.equal(httpUrl('https://wa.me/628119996286'), true)
})

test('all five globals have drafts; home uses lat/lng and gallery/ui exist', () => {
 for (const global of [Site,Home,About,Garis,Ui]) assert.deepEqual(global.versions, { drafts: true })
 assert.ok(has(Garis.fields, 'gallery'))
 assert.ok(has(Ui.fields, 'pages'))
 for (const name of ['priceNote','priceUpdatedAt']) assert.ok(has(Services.fields, name))
 assert.ok(has(Inquiries.fields, 'emailStatus'))
 // City pins keep their stored coordinates; the CMS map picker only sets them.
 const network = dataFields(Home.fields).find(f => 'name' in f && f.name === 'network')
 const cities = network && 'fields' in network ? dataFields(network.fields).find(f => 'name' in f && f.name === 'cities') : undefined
 assert.ok(cities && 'fields' in cities && has(cities.fields, 'lat') && has(cities.fields, 'lng'))
})

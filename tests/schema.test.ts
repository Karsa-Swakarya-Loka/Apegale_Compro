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

test('public collections restrict reads to published and protect writes', () => {
 for (const collection of [Services,Testimonials,Clients,Faqs,Posts,Regulations]) {
  assert.equal(collection.access?.read, publishedOrStaff)
  assert.deepEqual(collection.versions, { drafts: true })
  assert.ok(collection.fields.some(f => 'name' in f && f.name === 'enReviewed'))
 }
 assert.deepEqual(publishedOrStaff({ req: { user: null } } as Parameters<typeof publishedOrStaff>[0]), { _status: { equals: 'published' } })
 assert.equal(publishedOrStaff({ req: { user: { role: 'editor' } } } as Parameters<typeof publishedOrStaff>[0]), true)
 assert.equal(adminOnly({ req: { user: { role: 'editor' } } } as Parameters<typeof adminOnly>[0]), false)
 assert.equal(adminOnly({ req: { user: { role: 'admin' } } } as Parameters<typeof adminOnly>[0]), true)
 assert.equal(isStaff(null), false); assert.equal(isStaff({ role: 'unknown' }), false)
 assert.equal(isStaff({ role: 'editor' }), true); assert.equal(isStaff({ role: 'admin' }), true)
 assert.equal(Inquiries.access?.read, adminOnly); assert.equal(Inquiries.access?.create, adminOnly)
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
 assert.ok(Garis.fields.some(f => 'name' in f && f.name === 'gallery'))
 assert.ok(Ui.fields.some(f => 'name' in f && f.name === 'pages'))
 for (const name of ['priceNote','priceUpdatedAt']) assert.ok(Services.fields.some(f => 'name' in f && f.name === name))
 assert.ok(Inquiries.fields.some(f => 'name' in f && f.name === 'emailStatus'))
})

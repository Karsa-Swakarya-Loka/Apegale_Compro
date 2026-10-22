import assert from 'node:assert/strict'
import test from 'node:test'
import { navCurrent, navDestination } from '../src/lib/navigation.ts'
import { href, routeKeys, switchLocalePath } from '../src/i18n/routes.ts'

test('every primary menu route identifies only its exact current page in ID and EN', () => {
  for (const locale of ['id', 'en'] as const) for (const key of routeKeys) {
    const path = href(locale, key)
    for (const candidate of routeKeys) {
      assert.equal(navCurrent(path, href(locale, candidate), href(locale, 'home')), candidate === key ? 'page' : undefined)
    }
    assert.deepEqual(navDestination(path), { pathname: path, hash: '' })
    assert.equal(switchLocalePath(path, locale === 'id' ? 'en' : 'id'), href(locale === 'id' ? 'en' : 'id', key))
  }
})

test('a service detail marks its own link as page and its parent as location', () => {
  for (const locale of ['id', 'en'] as const) {
    const home = href(locale, 'home')
    const parent = href(locale, 'services')
    const detail = href(locale, 'services', 'legalitas-perusahaan')
    assert.equal(navCurrent(detail, detail, home), 'page')
    assert.equal(navCurrent(detail, parent, home), 'location')
    assert.equal(navCurrent(detail, href(locale, 'services', 'airport-escort'), home), undefined)
    assert.equal(navCurrent(parent + '-other', parent, home), undefined)
  }
})

test('same-page and cross-page anchors preserve the selected section without marking every anchor active', () => {
  for (const locale of ['id', 'en'] as const) for (const hash of ['salam', 'profil', 'founder', 'organigram']) {
    const path = href(locale, 'about')
    const link = href(locale, 'about', undefined, hash)
    assert.deepEqual(navDestination(link), { pathname: path, hash })
    assert.equal(navCurrent(path, link, href(locale, 'home')), undefined)
  }
  assert.deepEqual(navDestination('/en/news?page=2'), { pathname: '/en/news', hash: '' })
  assert.equal(navCurrent('/en/about/', '/en/about', '/en'), 'page')
})

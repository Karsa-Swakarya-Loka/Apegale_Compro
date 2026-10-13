import assert from 'node:assert/strict'
import test from 'node:test'
import { previewUrl, safePath } from '../src/lib/preview.ts'

test('safePath only accepts same-site paths', () => {
  assert.equal(safePath('/layanan/vitas?x=1'), '/layanan/vitas?x=1')
  for (const bad of [null, '', 'https://evil.example', '//evil.example', '/\\evil.example', 'layanan']) assert.equal(safePath(bad), null, String(bad))
})

test('admin preview URL follows the editor locale and the document slug', () => {
  const url = (u: string | null) => (u ? decodeURIComponent(new URL(u).searchParams.get('path') || '') : null)
  assert.equal(url(previewUrl('services', true)({ slug: 'vitas' }, { locale: 'id' })), '/layanan/vitas')
  assert.equal(url(previewUrl('services', true)({ slug: 'vitas' }, { locale: 'en' })), '/en/services/vitas')
  assert.equal(url(previewUrl('about')({}, { locale: 'en' })), '/en/about')
  assert.equal(previewUrl('news', true)({}, { locale: 'id' }), null) // unsaved doc without slug
})

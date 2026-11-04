import assert from 'node:assert/strict'
import test from 'node:test'
import { guessLang, planWrites, translatePair, type Translation } from '../src/lib/translate.ts'

const idTr: Translation = { lang: 'id', quote: { id: 'Halo', en: 'Hello' }, role: { id: 'Direktur', en: 'Director' } }
const enTr: Translation = { lang: 'en', quote: { id: 'Halo', en: 'Hello' } }

test('Indonesian quote on a new testimonial fills English, and the job title', () => {
  assert.deepEqual(planWrites({ saved: 'id', changed: true, enReviewed: false, current: { id: { quote: 'Halo', role: 'Direktur' }, en: {} }, tr: idTr }),
    { en: { quote: 'Hello', role: 'Director' } })
})
test('English quote on a new testimonial fills Indonesian', () => {
  assert.deepEqual(planWrites({ saved: 'en', changed: true, enReviewed: false, current: { id: {}, en: { quote: 'Hello' } }, tr: enTr }), { id: { quote: 'Halo' } })
})
test('Indonesian text typed under English is moved to Indonesian and English is regenerated', () => {
  assert.deepEqual(planWrites({ saved: 'en', changed: true, enReviewed: false, current: { id: {}, en: { quote: 'Halo' } }, tr: { lang: 'id', quote: idTr.quote } }),
    { id: { quote: 'Halo' }, en: { quote: 'Hello' } })
})
test('editing the Indonesian quote regenerates English unless it is marked as reviewed', () => {
  const current = { id: { quote: 'Halo' }, en: { quote: 'Hi (old)' } }
  assert.deepEqual(planWrites({ saved: 'id', changed: true, enReviewed: false, current, tr: enTr }), { en: { quote: 'Hello' } })
  assert.deepEqual(planWrites({ saved: 'id', changed: true, enReviewed: true, current, tr: enTr }), {})
})
test('editing the English quote never overwrites existing Indonesian text', () => {
  assert.deepEqual(planWrites({ saved: 'en', changed: true, enReviewed: false, current: { id: { quote: 'Halo asli' }, en: { quote: 'Hello' } }, tr: enTr }), {})
})
test('an unchanged save writes nothing when both languages exist', () => {
  assert.deepEqual(planWrites({ saved: 'id', changed: false, enReviewed: false, current: { id: { quote: 'Halo' }, en: { quote: 'Hi' } }, tr: enTr }), {})
})
test('language guess', () => {
  assert.equal(guessLang('Pelayanannya ramah dan cepat, saya sangat puas.'), 'id')
  assert.equal(guessLang('Friendly and fast service, I am very satisfied.'), 'en')
  assert.equal(guessLang('Direktur'), 'id')
})
test('no API key: the keyless fallback translates quote and job title in the detected direction', async () => {
  const key = process.env.ANTHROPIC_API_KEY
  delete process.env.ANTHROPIC_API_KEY
  const fake = (async (u: string) => {
    const url = new URL(u)
    const q = url.searchParams.get('q')!, pair = url.searchParams.get('langpair')!
    return new Response(JSON.stringify({ responseStatus: 200, responseData: { translatedText: `${pair}:${q}` } }))
  }) as unknown as typeof fetch
  assert.deepEqual(await translatePair({ quote: 'Saya sangat puas dengan layanan ini.', role: 'Direktur' }, fake),
    { lang: 'id', quote: { id: 'Saya sangat puas dengan layanan ini.', en: 'id|en:Saya sangat puas dengan layanan ini.' }, role: { id: 'Direktur', en: 'id|en:Direktur' } })
  assert.deepEqual(await translatePair({ quote: 'Great service and a very fast team.' }, fake),
    { lang: 'en', quote: { en: 'Great service and a very fast team.', id: 'en|id:Great service and a very fast team.' } })
  const limited = (async () => new Response(JSON.stringify({ responseStatus: 429, quotaFinished: true, responseData: { translatedText: 'MYMEMORY WARNING' } }))) as unknown as typeof fetch
  assert.equal(await translatePair({ quote: 'Halo' }, limited), null)
  if (key) process.env.ANTHROPIC_API_KEY = key
})
test('translatePair parses the model reply and rejects malformed ones', async () => {
  process.env.ANTHROPIC_API_KEY = 'test'
  const reply = (text: string) => (async () => new Response(JSON.stringify({ content: [{ type: 'text', text }] }))) as unknown as typeof fetch
  const ok = await translatePair({ quote: 'Halo' }, reply('```json\n{"lang":"id","quote":{"id":"Halo","en":"Hello"}}\n```'))
  assert.deepEqual(ok, { lang: 'id', quote: { id: 'Halo', en: 'Hello' } })
  assert.equal(await translatePair({ quote: 'Halo' }, reply('sorry')), null)
  assert.equal(await translatePair({ quote: 'Halo' }, reply('{"lang":"fr","quote":{"id":"a","en":"b"}}')), null)
  delete process.env.ANTHROPIC_API_KEY
})

import type { Locale } from '../i18n/config.ts'
import { faqKeys } from './manifest.ts'

export type Data = Record<string, unknown>
export function isObject(value: unknown): value is Data {
 return typeof value === 'object' && value !== null && !Array.isArray(value)
}
export function object(value: unknown): Data {
 if (!isObject(value)) throw new Error('Expected a seed object')
 return value
}
export function list(value: unknown): Data[] {
 if (!Array.isArray(value)) throw new Error('Expected a seed array')
 return value.map(object)
}
export function localized(value: unknown, locale: Locale): unknown {
 if (Array.isArray(value)) return value.map(item => localized(item, locale))
 if (!isObject(value)) return value
 if ('id' in value && 'en' in value) return value[locale]
 return Object.fromEntries(Object.entries(value).filter(([key]) => !key.startsWith('_')).map(([key, item]) => [key, localized(item, locale)]))
}
export function richText(value: string) {
 return { root: { type: 'root', version: 1, direction: null, format: '', indent: 0, children: [
  { type: 'paragraph', version: 1, direction: null, format: '', indent: 0, textFormat: 0, textStyle: '', children: [
   { type: 'text', version: 1, detail: 0, format: 0, mode: 'normal', style: '', text: value },
  ] },
 ] } }
}
// Reuse IDs for NON-localized arrays on the second locale write.
// Locale-specific arrays (mission/requirements) own separate rows.
export function alignArrayIDs(value: unknown, existing: unknown, key = ''): unknown {
 if (Array.isArray(value)) {
  const rows = Array.isArray(existing) ? existing : []
  return value.map((row, i) => {
   const aligned = alignArrayIDs(row, rows[i])
   if (!['mission','requirements'].includes(key) && isObject(aligned) && isObject(rows[i]) && rows[i].id)
     return { ...aligned, id: rows[i].id }
   return aligned
  })
 }
 if (!isObject(value)) return value
 const current = isObject(existing) ? existing : {}
 return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, alignArrayIDs(v, current[k], k)]))
}
export function normalizeService(raw: Data, locale: Locale): Data {
 const data = object(localized(raw, locale))
 delete data.body
 delete data.parent
 return { ...data, _status: 'draft', enReviewed: false }
}
export function normalizeFaq(raw: Data, locale: Locale, index: number): Data {
 if (!faqKeys[index]) throw new Error('Add a stable manifest key before adding another FAQ')
 const data = object(localized(raw, locale))
 return { ...data, answer: richText(String(data.answer)), seedKey: faqKeys[index], order: index + 1, _status: 'published', enReviewed: false }
}
export function normalizeGlobal(name: string, raw: Data, locale: Locale, mediaIDs: Map<string, number | string>): Data {
 const data = object(localized(raw, locale))
 const media = (source: unknown) => {
  const id = mediaIDs.get(String(source))
  if (id == null) throw new Error('Missing uploaded seed asset: ' + source)
  return id
 }
 if (name === 'home') {
  const hero = object(data.hero); hero.image = media(hero.image)
  const founder = object(data.founder); founder.photo = media(founder.photo)
  if (String(founder.quote).startsWith('[')) delete founder.quote
  const cities = list(object(data.network).cities)
  for (const city of cities) if (typeof city.lat !== 'number' || typeof city.lng !== 'number' || Math.abs(city.lat) > 90 || Math.abs(city.lng) > 180) throw new Error('Invalid city coordinates')
 }
 if (name === 'about') {
  data.mission = (data.mission as string[]).map(text => ({ text }))
  const members = list(data.organigram)
  data.organigram = members.map(member => {
   const { parent, ...rest } = member
   if (!parent) return rest
   const parentIndex = members.findIndex(candidate => candidate.name === parent)
   if (parentIndex < 0) throw new Error('Unknown organigram parent: ' + parent)
   return { ...rest, parentIndex }
  })
 }
 if (name === 'garis') {
  data.gallery = (data.images as string[]).map(source => ({ image: media(source) }))
  data.features = []
  delete data.images
  delete data.ctaDisabledLabel
 }
 return { ...data, _status: 'published' }
}
export function atPath(value: unknown, dotted: string): unknown {
 return dotted.split('.').reduce<unknown>((result, key) => isObject(result) ? result[key] : undefined, value)
}


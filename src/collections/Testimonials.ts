import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { checkbox, order, review, row, text, textarea, upload, statusColumn } from '../lib/fields.ts'
import { hasConsentForStatus } from '../lib/validation.ts'
import { planWrites, translatePair, type Fields, type L } from '../lib/translate.ts'
const LOCALES: L[] = ['id', 'en']
export const Testimonials: CollectionConfig = {
 slug: 'testimonials', labels: { singular: 'Testimoni', plural: 'Testimoni' },
 admin: { hideAPIURL: true, group: 'Konten situs', useAsTitle: 'name', defaultColumns: ['name', 'company', 'consent', 'statusBadge', 'enReviewed'],
  description: 'Tayang hanya setelah klien memberi izin. Isi sekali dalam bahasa Indonesia atau Inggris: versi bahasa lainnya dibuat otomatis saat disimpan.' },
 access: contentAccess, versions: { drafts: true },
 hooks: { beforeChange: [({ data, originalDoc }) => {
   const status = data._status ?? originalDoc?._status
   const consent = data.consent ?? originalDoc?.consent
   if (!hasConsentForStatus(status, consent)) throw new Error('Izin tampil wajib sebelum testimoni dipublikasikan.')
   return data
 }],
  // Write the quote once (Indonesian or English); the other language is generated on save. Skipped while this hook's own
  // follow-up writes run, and silently skipped without ANTHROPIC_API_KEY (the site then shows the original text).
  afterChange: [async ({ doc, previousDoc, req, context }) => {
   if (context?.skipTranslate) return doc
   const saved = req.locale as L
   if (!LOCALES.includes(saved) || !doc.quote) return doc
   const draft = doc._status !== 'published'
   const read = async (locale: L): Promise<Fields> => {
    const d = await req.payload.findByID({ collection: 'testimonials', id: doc.id, locale, fallbackLocale: false, draft: true, depth: 0, overrideAccess: true, req: { ...req, locale } })
    return { quote: d.quote, role: d.role }
   }
   const current = { id: await read('id'), en: await read('en') }
   const own = current[saved]
   const tr = await translatePair({ quote: own.quote || doc.quote, role: own.role })
   if (!tr) return doc
   const writes = planWrites({ saved, changed: previousDoc?.quote !== doc.quote, enReviewed: doc.enReviewed === true, current, tr })
   for (const locale of LOCALES) {
    const data = writes[locale]
    if (!data) continue
    await req.payload.update({ collection: 'testimonials', id: doc.id, locale, data, draft, depth: 0, overrideAccess: true,
     req: { ...req, locale }, context: { skipTranslate: true } })
   }
   return doc
  }] },
 fields: [statusColumn, 
  textarea('quote', { label: 'Kutipan' }),
  row({ name: 'name', type: 'text', required: true, label: 'Nama', admin: { width: '34%' } }, text('role', false, { label: 'Jabatan', width: '33%' }),
   { name: 'company', type: 'text', required: true, label: 'Perusahaan', admin: { width: '33%' } }),
  upload('logo', { label: 'Logo perusahaan (opsional)' }),
  checkbox('consent', 'Klien sudah mengizinkan tampil', { sidebar: true }), order, review,
 ],
}

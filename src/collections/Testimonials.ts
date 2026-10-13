import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { order, review, text, textarea, upload } from '../lib/fields.ts'
import { hasConsentForStatus } from '../lib/validation.ts'
export const Testimonials: CollectionConfig = {
 slug: 'testimonials', admin: { useAsTitle: 'name', defaultColumns: ['name','company','consent','_status','enReviewed'] },
 access: contentAccess, versions: { drafts: true },
 hooks: { beforeChange: [({ data, originalDoc }) => {
   const status = data._status ?? originalDoc?._status
   const consent = data.consent ?? originalDoc?.consent
   if (!hasConsentForStatus(status, consent)) throw new Error('Izin tampil wajib sebelum testimoni dipublikasikan.')
   return data
 }] },
 fields: [textarea('quote'), { name: 'name', type: 'text', required: true }, text('role'),
 { name: 'company', type: 'text', required: true }, upload('logo'), { name: 'consent', type: 'checkbox', defaultValue: false }, order, review],
}

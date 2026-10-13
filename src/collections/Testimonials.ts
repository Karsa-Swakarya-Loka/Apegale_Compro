import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { checkbox, order, review, row, text, textarea, upload, statusColumn } from '../lib/fields.ts'
import { hasConsentForStatus } from '../lib/validation.ts'
export const Testimonials: CollectionConfig = {
 slug: 'testimonials', labels: { singular: 'Testimoni', plural: 'Testimoni' },
 admin: { hideAPIURL: true, group: 'Konten situs', useAsTitle: 'name', defaultColumns: ['name', 'company', 'consent', 'statusBadge', 'enReviewed'],
  description: 'Tayang hanya setelah klien memberi izin.' },
 access: contentAccess, versions: { drafts: true },
 hooks: { beforeChange: [({ data, originalDoc }) => {
   const status = data._status ?? originalDoc?._status
   const consent = data.consent ?? originalDoc?.consent
   if (!hasConsentForStatus(status, consent)) throw new Error('Izin tampil wajib sebelum testimoni dipublikasikan.')
   return data
 }] },
 fields: [statusColumn, 
  textarea('quote', { label: 'Kutipan' }),
  row({ name: 'name', type: 'text', required: true, label: 'Nama', admin: { width: '34%' } }, text('role', false, { label: 'Jabatan', width: '33%' }),
   { name: 'company', type: 'text', required: true, label: 'Perusahaan', admin: { width: '33%' } }),
  upload('logo', { label: 'Logo perusahaan (opsional)' }),
  checkbox('consent', 'Klien sudah mengizinkan tampil', { sidebar: true }), order, review,
 ],
}

import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { listAdmin, review, richText, row, slug, text, textarea } from '../lib/fields.ts'
import { previewUrl } from '../lib/preview.ts'
export const Regulations: CollectionConfig = {
 slug: 'regulations', labels: { singular: 'Regulasi', plural: 'Regulasi' },
 admin: { group: 'Konten situs', preview: previewUrl('regulations', true), useAsTitle: 'title', defaultColumns: ['title', 'category', 'issuedAt', '_status', 'enReviewed'],
  description: 'Peraturan dan dokumen PDF di halaman Regulasi.' },
 access: contentAccess, versions: { drafts: true },
 fields: [
  text('title', true, { label: 'Judul peraturan' }),
  row({ name: 'category', type: 'select', required: true, label: 'Kategori', admin: { width: '40%' }, options: [
    { label: 'Undang-undang Cipta Kerja', value: 'cipta-kerja' }, { label: 'Ketentuan Perizinan TKA', value: 'perizinan-tka' },
    { label: 'Ketentuan Keimigrasian TKA', value: 'keimigrasian-tka' }, { label: 'Ketentuan Manpower Supply', value: 'manpower-supply' },
    { label: 'Ketentuan lainnya', value: 'lainnya' }] },
   { name: 'number', type: 'text', label: 'Nomor peraturan', admin: { width: '35%', placeholder: 'mis. PP No. 34 Tahun 2021' } },
   { name: 'issuedAt', type: 'date', label: 'Tanggal terbit', admin: { width: '25%', date: { pickerAppearance: 'dayOnly' } } }),
  textarea('summary', { label: 'Ringkasan' }),
  richText('body', { label: 'Isi / penjelasan' }),
  { name: 'attachments', type: 'array', label: 'File PDF', labels: { singular: 'File', plural: 'File' }, admin: listAdmin('Unggah PDF peraturan; pengunjung bisa mengunduhnya.'), fields: [
   row({ name: 'file', type: 'upload', relationTo: 'media', required: true, label: 'File PDF', filterOptions: { mimeType: { equals: 'application/pdf' } }, admin: { width: '50%' } },
    text('label', true, { label: 'Nama tombol unduh', width: '50%', placeholder: 'mis. Unduh PP 34/2021' })),
  ] },
  slug, review,
 ],
}

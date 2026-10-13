import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { checkbox, order, review, richText, row, seedKey, text } from '../lib/fields.ts'
export const Faqs: CollectionConfig = {
 slug: 'faqs', labels: { singular: 'Pertanyaan (FAQ)', plural: 'Pertanyaan (FAQ)' },
 admin: { group: 'Konten situs', useAsTitle: 'question', defaultColumns: ['question', 'category', 'featured', '_status', 'enReviewed'],
  description: 'Tanya-jawab di Beranda, Layanan, GARIS dan Hubungi Kami.' },
 access: contentAccess, versions: { drafts: true },
 fields: [
  text('question', true, { label: 'Pertanyaan' }),
  richText('answer', { label: 'Jawaban' }),
  row({ name: 'category', type: 'select', required: true, label: 'Tampil di halaman', admin: { width: '50%' },
    options: [{ label: 'Umum (Beranda & Hubungi Kami)', value: 'umum' }, { label: 'Layanan', value: 'layanan' }, { label: 'GARIS', value: 'garis' }] },
   { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true, label: 'Juga tampil di layanan (opsional)', admin: { width: '50%' } }),
  checkbox('featured', 'Tampilkan di Beranda', { sidebar: true }), order, seedKey, review,
 ],
}

import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { checkbox, icon, listAdmin, order, review, richText, row, seo, slug, tab, tabs, text, textarea, upload } from '../lib/fields.ts'
import { previewUrl } from '../lib/preview.ts'
export const Services: CollectionConfig = {
 slug: 'services', labels: { singular: 'Layanan', plural: 'Layanan' },
 admin: { group: 'Konten situs', preview: previewUrl('services', true), useAsTitle: 'title', defaultColumns: ['title', 'parent', 'showInMenu', '_status', 'enReviewed'],
  description: 'Enam layanan utama dan sub-layanannya. Untuk sub-layanan, isi "Induk layanan".' },
 access: contentAccess, versions: { drafts: true },
 fields: [
  tabs(
   tab('Isi layanan', [
    text('title', true, { label: 'Nama layanan' }),
    row({ name: 'parent', type: 'relationship', relationTo: 'services', label: 'Induk layanan (untuk sub-layanan)', admin: { width: '60%', description: 'Kosongkan untuk layanan utama.' } },
     icon('icon', { width: '40%' })),
    { name: 'summary', type: 'textarea', localized: true, maxLength: 600, label: 'Ringkasan', admin: { description: 'Tampil di kartu layanan dan di bawah judul halaman (maks. 600 karakter).' } },
    richText('body', { label: 'Penjelasan lengkap' }),
    { name: 'requirements', type: 'array', localized: true, label: 'Persyaratan / poin penting', labels: { singular: 'Poin', plural: 'Poin' },
     admin: listAdmin('Daftar centang di halaman layanan.'), fields: [{ name: 'text', type: 'text', required: true, label: 'Poin' }] },
    upload('image', { label: 'Foto layanan (opsional)' }),
   ]),
   tab('Harga', [
    { name: 'priceItems', type: 'array', label: 'Daftar harga', labels: { singular: 'Harga', plural: 'Harga' }, admin: listAdmin('Kosongkan bila harga tidak ditampilkan.'), fields: [
     row(text('name', true, { label: 'Nama item', width: '40%' }), text('duration', false, { label: 'Durasi', width: '25%', placeholder: 'mis. 5–7 hari kerja' }),
      { name: 'priceFrom', type: 'number', min: 0, label: 'Harga mulai (Rp)', admin: { width: '35%', description: 'Kosong = tampil "Hubungi kami".' } }),
     row(text('note', false, { label: 'Catatan kecil (opsional)', width: '70%' }), checkbox('featured', 'Sorot baris ini')),
    ] },
    row(textarea('priceNote', { label: 'Catatan di bawah tabel', width: '65%' }),
     { name: 'priceUpdatedAt', type: 'date', label: 'Harga diperbarui', admin: { width: '35%', date: { pickerAppearance: 'dayOnly' } } }),
   ]),
   tab('SEO', [seo()]),
  ),
  slug, order, checkbox('showInMenu', 'Tampil di menu', { sidebar: true, defaultValue: true }), review,
 ],
}

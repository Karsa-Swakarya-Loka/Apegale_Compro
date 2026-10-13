import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { review, richText, row, seo, slug, text, textarea, upload } from '../lib/fields.ts'
import { previewUrl } from '../lib/preview.ts'
export const Posts: CollectionConfig = {
 slug: 'posts', labels: { singular: 'Berita', plural: 'Berita' },
 admin: { group: 'Konten situs', preview: previewUrl('news', true), useAsTitle: 'title', defaultColumns: ['title', 'category', 'publishedAt', '_status', 'enReviewed'],
  description: 'Berita dan panduan di halaman Berita.' },
 access: contentAccess, versions: { drafts: true },
 fields: [
  text('title', true, { label: 'Judul' }),
  row({ name: 'category', type: 'select', required: true, label: 'Kategori', admin: { width: '50%' }, options: [{ label: 'Berita', value: 'news' }, { label: 'Panduan', value: 'panduan' }] },
   { name: 'publishedAt', type: 'date', label: 'Tanggal terbit', admin: { width: '50%', date: { pickerAppearance: 'dayOnly' } } }),
  upload('cover', { label: 'Foto sampul' }),
  textarea('excerpt', { label: 'Ringkasan', description: 'Tampil di kartu daftar berita (1–2 kalimat).' }),
  richText('body', { label: 'Isi berita' }),
  seo(), slug, review,
 ],
}

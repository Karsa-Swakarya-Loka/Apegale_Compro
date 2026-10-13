import type { GlobalConfig } from 'payload'
import { globalAccess } from '../lib/access.ts'
import { checkbox, listAdmin, plain, row, seo, tab, tabs, text, textarea, upload } from '../lib/fields.ts'
import { httpUrl } from '../lib/validation.ts'
import { previewUrl } from '../lib/preview.ts'
export const Garis: GlobalConfig = {
 slug: 'garis', label: 'GARIS', admin: { hideAPIURL: true, group: 'Halaman', preview: previewUrl('garis') },
 access: globalAccess, versions: { drafts: true },
 fields: [
  tabs(
   tab('Isi halaman', [
    textarea('intro', { label: 'Paragraf pembuka' }),
    upload('logo', { label: 'Logo GARIS' }),
    { name: 'gallery', type: 'array', label: 'Gambar aplikasi', labels: { singular: 'Gambar', plural: 'Gambar' }, admin: listAdmin('Gambar pertama (mockup laptop) tampil di Beranda dan halaman GARIS.'),
     fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Gambar' }] },
   ]),
   tab('Modul & fitur', [
    { name: 'variants', type: 'array', label: 'Modul', labels: { singular: 'Modul', plural: 'Modul' }, admin: listAdmin(), fields: [
     plain('name', { label: 'Nama modul', required: true }), textarea('text', { label: 'Penjelasan' }), upload('image', { label: 'Gambar (opsional)' }),
    ] },
    { name: 'features', type: 'array', label: 'Fitur', labels: { singular: 'Fitur', plural: 'Fitur' }, admin: listAdmin(), fields: [
     text('title', false, { label: 'Nama fitur' }), textarea('text', { label: 'Penjelasan' }),
    ] },
   ]),
   tab('Akses aplikasi', [
    checkbox('enabled', 'Aplikasi sudah aktif', { description: 'Selama belum dicentang, tombol Login dan Coba gratis tampil sebagai "Segera hadir".' }),
    row({ name: 'loginUrl', type: 'text', validate: httpUrl, label: 'Link Login', admin: { width: '50%', placeholder: 'https://' } },
     { name: 'trialUrl', type: 'text', validate: httpUrl, label: 'Link Coba gratis', admin: { width: '50%', placeholder: 'https://' } }),
   ]),
   tab('SEO', [seo()]),
  ),
 ],
}

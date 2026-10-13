import type { GlobalConfig } from 'payload'
import { globalAccess } from '../lib/access.ts'
import { listAdmin, plain, richText, row, seo, tab, tabs, text, textarea } from '../lib/fields.ts'
import { previewUrl } from '../lib/preview.ts'
export const About: GlobalConfig = {
 slug: 'about', label: 'Tentang Kami', admin: { hideAPIURL: true, group: 'Halaman', preview: previewUrl('about'), description: 'Isi halaman Tentang Kami.' },
 access: globalAccess, versions: { drafts: true },
 fields: [
  tabs(
   tab('Profil & visi misi', [
    textarea('intro', { label: 'Kalimat di bawah judul halaman' }),
    richText('profile', { label: 'Profil perusahaan' }),
    textarea('vision', { label: 'Visi' }),
    { name: 'mission', type: 'array', localized: true, label: 'Misi', labels: { singular: 'Misi', plural: 'Misi' }, admin: listAdmin(),
     fields: [{ name: 'text', type: 'text', required: true, label: 'Butir misi' }] },
   ]),
   tab('Salam dari kami', [richText('greeting', { label: 'Sambutan', description: 'Nama dan foto pendiri diambil dari Beranda → Pendiri.' })]),
   tab('Nilai', [
    { name: 'values', type: 'array', label: 'Nilai perusahaan', labels: { singular: 'Nilai', plural: 'Nilai' }, admin: listAdmin(), fields: [text('title', false, { label: 'Nama nilai' }), textarea('text', { label: 'Penjelasan' })] },
   ]),
   tab('Struktur organisasi', [
    { name: 'organigram', type: 'array', label: 'Orang dalam struktur', labels: { singular: 'Orang', plural: 'Orang' },
     admin: listAdmin('Isi dari pimpinan ke bawah. Untuk tiap orang pilih atasannya.'), fields: [
      row(plain('name', { label: 'Nama', required: true, width: '50%' }), text('role', false, { label: 'Jabatan', width: '50%' })),
      { name: 'parentIndex', type: 'number', min: 0, admin: { components: { Field: '/components/admin/ParentPicker#ParentPicker' } } },
     ] },
   ]),
   tab('SEO', [seo()]),
  ),
 ],
}

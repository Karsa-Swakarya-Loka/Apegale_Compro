import type { GlobalConfig } from 'payload'
import { adminOnly, globalAccess } from '../lib/access.ts'
import { listAdmin, row, seo, tab, tabs, text, textarea } from '../lib/fields.ts'
import { httpUrl } from '../lib/validation.ts'
export const Site: GlobalConfig = {
 slug: 'site', label: 'Kontak & pengaturan situs', admin: { hideAPIURL: true, group: 'Pengaturan' },
 access: { ...globalAccess, update: adminOnly }, versions: { drafts: true },
 fields: [
  tabs(
   tab('Kontak', [
    row({ name: 'phone', type: 'text', label: 'Telepon kantor', admin: { width: '50%', placeholder: '(021) 5092 8670' } },
     { name: 'email', type: 'email', label: 'Email', admin: { width: '50%' } }),
    row({ name: 'whatsapp', type: 'text', label: 'Nomor WhatsApp', admin: { width: '50%', placeholder: '628119996286', description: 'Angka saja, diawali 62 (tanpa + atau 0).' },
      validate: (v: unknown) => !v || /^\d+$/.test(String(v)) || 'Gunakan angka tanpa tanda +.' },
     text('whatsappDefaultMessage', false, { label: 'Pesan awal WhatsApp', width: '50%', description: 'Teks yang sudah terisi saat pengunjung membuka WhatsApp.' })),
    textarea('address', { label: 'Alamat kantor' }),
    { name: 'mapsUrl', type: 'text', validate: httpUrl, label: 'Link Google Maps', admin: { placeholder: 'https://maps.google.com/…', description: 'Buka lokasi di Google Maps → Bagikan → Salin link.' } },
   ]),
   tab('Angka & media sosial', [
    { name: 'stats', type: 'array', label: 'Angka resmi', labels: { singular: 'Angka', plural: 'Angka' }, admin: listAdmin('Tampil di Beranda dan Tentang Kami, mis. 20+ tahun pengalaman.'), fields: [
     row({ name: 'value', type: 'text', required: true, label: 'Angka', admin: { width: '30%', placeholder: '20+' } }, text('label', true, { label: 'Keterangan', width: '70%' })),
    ] },
    { name: 'social', type: 'array', label: 'Media sosial', labels: { singular: 'Akun', plural: 'Akun' }, admin: listAdmin(), fields: [
     row({ name: 'platform', type: 'select', required: true, label: 'Platform', admin: { width: '30%' }, options: [
       { label: 'Instagram', value: 'instagram' }, { label: 'LinkedIn', value: 'linkedin' }, { label: 'YouTube', value: 'youtube' }, { label: 'Facebook', value: 'facebook' }] },
      { name: 'url', type: 'text', required: true, validate: httpUrl, label: 'Link profil', admin: { width: '70%', placeholder: 'https://' } }),
    ] },
   ]),
   tab('SEO bawaan', [seo('seoDefault')], 'Dipakai untuk halaman yang SEO-nya tidak diisi.'),
  ),
 ],
}

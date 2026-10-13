import type { Field, GlobalConfig } from 'payload'
import { globalAccess } from '../lib/access.ts'
import { checkbox, cityPin, icon, listAdmin, plain, row, seo, tab, tabs, text, textarea, upload } from '../lib/fields.ts'
import { INDONESIA_MAP } from '../lib/indonesia-map.ts'
import { previewUrl } from '../lib/preview.ts'

const button = (name: string, label: string): Field => ({ name, type: 'group', label, admin: { hideGutter: true }, fields: [
 row(text('label', false, { label: 'Tulisan tombol', width: '50%' }),
  plain('href', { label: 'Tujuan tombol', width: '50%', placeholder: '/hubungi-kami', description: 'Halaman situs (mis. /layanan) atau tulis "whatsapp".' })),
] })
const group = (name: string, fields: Field[]): Field => ({ name, type: 'group', label: false, admin: { hideGutter: true }, fields })
const sections: [string, string][] = [
 ['hero', 'Hero (bagian atas)'], ['clients', 'Logo klien'], ['services', 'Layanan'], ['why', 'Mengapa Ape Gale'], ['garis', 'GARIS'],
 ['network', 'Jaringan kota'], ['founder', 'Tentang kami & pendiri'], ['testimonials', 'Testimoni'], ['faq', 'FAQ'], ['news', 'Berita terbaru'], ['contactCta', 'Formulir kontak'],
]

export const Home: GlobalConfig = {
 slug: 'home', label: 'Beranda', admin: { group: 'Halaman', preview: previewUrl('home'), description: 'Isi halaman Beranda, dikelompokkan per bagian halaman.' },
 access: globalAccess, versions: { drafts: true },
 fields: [
  tabs(
   tab('Hero', [group('hero', [
    text('eyebrow', false, { label: 'Teks kecil di atas judul', placeholder: 'mis. Untuk perusahaan yang mempekerjakan tenaga kerja asing' }),
    row(text('headline', false, { label: 'Judul besar', width: '60%' }), text('highlight', false, { label: 'Kata yang diwarnai', width: '40%', description: 'Harus sama persis dengan bagian dari judul.' })),
    textarea('lead', { label: 'Paragraf pembuka' }),
    upload('image', { label: 'Foto hero' }),
    button('primaryCta', 'Tombol utama'), button('secondaryCta', 'Tombol kedua'),
   ])], 'Bagian paling atas Beranda; juga dipakai sebagai foto header halaman lain.'),
   tab('Mengapa Ape Gale', [
    { name: 'why', type: 'array', maxRows: 4, label: 'Poin keunggulan (maks. 4)', labels: { singular: 'Poin', plural: 'Poin' }, admin: listAdmin(), fields: [
     row(text('title', false, { label: 'Judul poin', width: '65%' }), icon('icon', { width: '35%' })),
     textarea('text', { label: 'Penjelasan singkat' }),
    ] },
   ]),
   tab('Jaringan kota', [group('network', [
    text('title', false, { label: 'Judul bagian' }),
    textarea('text', { label: 'Paragraf' }),
    { name: 'cities', type: 'array', label: 'Kota di peta', labels: { singular: 'Kota', plural: 'Kota' },
     admin: listAdmin('Ketik nama kota, titik di peta terisi otomatis. Seret item untuk mengubah urutan.'),
     fields: cityPin({ ...INDONESIA_MAP, svg: '/brand/indonesia-land.svg' }) },
   ])]),
   tab('Pendiri', [group('founder', [
    row(plain('name', { label: 'Nama', width: '50%' }), text('role', false, { label: 'Jabatan', width: '50%' })),
    upload('photo', { label: 'Foto', description: 'PNG berlatar transparan (potongan badan) supaya menyatu dengan latar.' }),
    textarea('quote', { label: 'Kutipan (opsional)' }),
   ])]),
   tab('Tampilkan bagian', [
    { name: 'sectionsVisible', type: 'group', label: false, admin: { hideGutter: true, description: 'Hapus centang untuk menyembunyikan bagian dari Beranda.' },
     fields: [row(...sections.map(([name, label]) => ({ ...checkbox(name, label, { defaultValue: true }), admin: { width: '33%' } }) as Field))] },
   ]),
   tab('SEO', [seo(), { name: 'intro', type: 'textarea', localized: true, admin: { hidden: true } }]),
  ),
 ],
}

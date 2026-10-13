import type { Field, GlobalConfig } from 'payload'
import { globalAccess } from '../lib/access.ts'
import { row, seo, tab, tabs, text, textarea } from '../lib/fields.ts'

// Short texts used across the site. Labels describe where each text appears; fields sit three per row.
const group = (name: string, items: [string, string][]): Field => ({
 name, type: 'group', label: false, admin: { hideGutter: true },
 fields: [row(...items.map(([key, label]) => text(key, false, { label, width: '33%' })))],
})
const pages: [string, string][] = [['services', 'Halaman Layanan'], ['regulations', 'Halaman Regulasi'], ['news', 'Halaman Berita'], ['contact', 'Halaman Hubungi Kami']]

export const Ui: GlobalConfig = {
 slug: 'ui', label: 'Teks tombol & menu', admin: { hideAPIURL: true, group: 'Pengaturan', description: 'Teks pendek di menu, tombol dan formulir. Isi versi Indonesia dan Inggris lewat pilihan bahasa di kanan atas.' },
 access: globalAccess, versions: { drafts: true },
 fields: [
  tabs(
   tab('Menu', [group('nav', [['home', 'Beranda'], ['about', 'Tentang kami'], ['services', 'Layanan'], ['garis', 'GARIS'], ['regulations', 'Regulasi'], ['news', 'Berita'], ['contact', 'Hubungi kami']])]),
   tab('Tombol', [group('cta', [['consult', 'Minta penawaran'], ['viewServices', 'Lihat layanan'], ['more', 'Selengkapnya'], ['read', 'Baca'], ['whatsapp', 'Chat WhatsApp'],
    ['askWhatsapp', 'Tanya via WhatsApp'], ['send', 'Kirim'], ['download', 'Unduh'], ['comingSoon', 'Segera hadir']])]),
   tab('Formulir', [group('form', [['name', 'Label nama'], ['company', 'Label perusahaan'], ['email', 'Label email'], ['whatsapp', 'Label WhatsApp'], ['service', 'Label layanan'],
    ['message', 'Label pesan'], ['errorEmail', 'Pesan email salah'], ['errorRequired', 'Pesan wajib diisi'], ['success', 'Pesan terkirim']])]),
   tab('Tabel harga', [group('price', [['service', 'Kolom layanan'], ['duration', 'Kolom durasi'], ['from', 'Kolom harga'], ['contact', 'Teks "Hubungi kami"'], ['note', 'Catatan tabel']])]),
   tab('Judul bagian', [group('sections', [['services', 'Layanan'], ['why', 'Mengapa'], ['clients', 'Klien'], ['testimonials', 'Testimoni'], ['faq', 'FAQ'], ['news', 'Berita']]),
    group('lang', [['label', 'Label pilihan bahasa']])]),
   tab('Halaman daftar', [{ name: 'pages', type: 'group', label: false, admin: { hideGutter: true }, fields: pages.map(([name, label]) => ({
    name, type: 'group' as const, label, fields: [textarea('intro', { label: 'Kalimat di bawah judul' }), seo()] })) }]),
  ),
 ],
}

# Status langkah 4 — 09 Oktober 2026

**Selesai. Langkah 5 (Tentang Kami) boleh dimulai.**

## Migrasi isi layanan

- Sumber: `legacy/*.html` (16 halaman). Isi dirapikan (typo, ejaan, struktur) dan diterjemahkan ke English, disimpan di `content/seed/services-content.json` agar bisa direview.
- `npm run content:services` (`scripts/migrate-services-content.ts`) mengubah blok `p / h2 / h3 / ul` (+ `**tebal**`) menjadi rich text Lexical dan menulis `body` ID + EN beserta status. Dapat diulang. `src/seed/services-content.ts` berisi konversi + validasi (struktur ID/EN harus sejajar, draft wajib punya catatan `verify`).
- **Dipublish (7):** Broad Expatriate Hosting, Expatriate Formalities, Manpower Supply, Legalitas Perusahaan, Airport Escort, HR System & Consulting, All in One Solutions — deskripsi umum tanpa angka/aturan hukum spesifik.
- **Tetap draft (9), keputusan #7 dan #20:** KITAS & KITAP, Visa & Paspor, KITAS Lansia, VITAS, Multiple Business Visa, Visa Kunjungan, Visa Penyatuan Keluarga, Visa on Arrival, Visa Pelajar. Isinya sudah dimigrasi (ID+EN) tapi memuat kode visa, durasi, usia, dan nilai dana dari 2021. Tiap entri punya catatan `verify` yang menyebut apa yang harus dicek. Setelah diverifikasi: ubah `status` jadi `published` di JSON lalu jalankan `npm run content:services`, atau publish langsung dari admin.
- `npm run seed` diulang tidak menimpa isi hasil migrasi (diverifikasi: 7 published × 2 bahasa tetap berisi).

## Halaman

| Route | Isi |
|---|---|
| `/layanan` · `/en/services` | Header halaman (breadcrumb, H1, intro), grid 6 layanan, daftar harga (gabungan `priceItems` featured; tersembunyi bila kosong), FAQ kategori layanan, CTA |
| `/layanan/[slug]` · `/en/services/[slug]` | Breadcrumb (dengan induk), H1 + ringkasan + tombol WhatsApp berisi nama layanan, isi rich text, persyaratan (bila ada), daftar layanan di samping (sticky, item aktif ditandai), pilihan sub-layanan (hanya yang published), tabel harga layanan, FAQ terkait, 3 layanan lain, CTA. Draft & slug tak dikenal → 404 |

Komponen baru: `content/PageHeader`, `content/Prose` (rich text), `content/PriceTable` (Rupiah `Intl`, "Hubungi kami" bila harga kosong, catatan + tanggal update). Template: `templates/ServicesPage`, `templates/ServiceDetailPage`. Query baru di `lib/cms.ts`: `getServiceBySlug`, `getFaqs`, `getFeaturedPrices`. Gaya: `styles/pages.css`.

## Hasil pemeriksaan

- typecheck, lint, build lulus (route `/layanan`, `/layanan/[slug]`, `/en/services`, `/en/services/[slug]`).
- Unit test 13/13 (tambahan `tests/services-content.test.ts`: 16 layanan, struktur ID/EN sejajar, hanya 7 yang dipublish, konversi Lexical, validator menolak struktur tidak sejajar — sekaligus menangkap bug crash di validator yang sudah diperbaiki).
- `verify:cms` lulus (diperbarui: tidak lagi mengharuskan semua layanan draft; tetap memastikan draft tidak bocor ke publik).
- Uji halaman (Playwright, server dev): **41/41 lulus** — H1, breadcrumb 2–4 tingkat, 6 kartu, harga tersembunyi tanpa data, FAQ layanan, isi rich text (h2 + 5 item daftar), daftar samping + item aktif, pesan WhatsApp berisi nama layanan, sub-layanan hanya yang published, toggle ID→EN tetap di layanan yang sama dengan isi berbahasa Inggris, 404 untuk draft & slug tak dikenal, tanpa error console, tanpa overflow 360–1440px.
- `PriceTable` dirender dengan data uji: `Rp 3.500.000` / `IDR 3,500,000`, harga kosong → "Hubungi kami"/"Contact us", catatan + tanggal, tabel kosong tidak dirender.

## Catatan

- Skrip yang menulis ke database (`seed`, `content:services`, `verify:cms`) sebaiknya dijalankan saat `npm run dev` berhenti; SQLite bisa tertahan kunci bila keduanya menulis bersamaan.
- Daftar harga belum tampil karena belum ada data harga dari klien.

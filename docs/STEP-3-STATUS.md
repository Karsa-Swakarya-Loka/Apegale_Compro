# Status langkah 3 — 09 Oktober 2026

**Selesai, kecuali pengiriman form (langkah 8, sesuai keputusan #24). Langkah 4 boleh dimulai.**

## Susunan Home (docs/02)

| # | Section | Sumber data | Saat data kosong |
|---|---|---|---|
| 1 | Hero (diagonal, H1 + sorotan, lead, 2 CTA, statistik, foto) | `home.hero`, `site.stats` | — |
| 2 | Logo klien | koleksi `clients` (11, published) | tersembunyi |
| 3 | Layanan (grid 6, sub-layanan Expatriate Formalities) | `services` published, parent kosong | tersembunyi |
| 4 | Mengapa Ape Gale (4 keunggulan) | `home.why` | tersembunyi |
| 5 | GARIS (3 varian, 2 screenshot, tombol "Segera Hadir" + WhatsApp) | global `garis` | tombol aktif hanya bila `enabled` + URL |
| 6 | Jaringan 35+ kota (peta Natural Earth + 13 kota, koordinat asli) | `home.network` | tersembunyi bila tanpa judul |
| 7 | Tentang singkat + founder (visi, nama, jabatan, foto) | `about.vision`, `home.founder` | kutipan founder tidak tampil sampai disetujui |
| 8 | Testimoni | `testimonials` published + consent | **tersembunyi** (belum ada data) |
| 9 | FAQ (4 featured, native details) | `faqs` featured | tersembunyi |
| 10 | Berita & regulasi terbaru (3) | `posts` + `regulations` published | **tersembunyi** (belum ada data) |
| 11 | CTA + form singkat | `ui.form`, layanan published | tombol Kirim non-aktif + catatan; WhatsApp aktif |

Setiap section juga bisa dimatikan dari CMS lewat `home.sectionsVisible`.

## File baru

- `src/components/templates/HomePage.tsx` (+ `homeMetadata`) — menggantikan `HomePlaceholder`.
- `src/components/home/`: `Hero`, `WhySection`, `GarisSection`, `NetworkSection`, `AboutSection`, `ContactCta`.
- `src/components/content/`: `ServiceCard` (judul = link seluruh kartu, sub-layanan link terpisah), `ClientStrip`, `FAQ` (rich text Lexical), `NewsCard`, `Testimonial`, `StatBadge` (`<dl>`).
- `src/components/ui/Icon.tsx` — nama ikon CMS → Lucide.
- `src/lib/indonesia-map.ts` — garis pantai Indonesia dari Natural Earth 1:50m (domain publik), 110 pulau, disederhanakan Douglas-Peucker 0,7px (18 KB), plus fungsi proyeksi lat/lng.
- `src/lib/cms.ts` — query Home: `getAbout`, `getGaris`, `getClients`, `getTopServices`, `getTestimonials`, `getFeaturedFaqs`, `getLatestArticles`, `asMedia` (URL media dijadikan same-origin).
- `src/i18n/routes.ts` — `localizeHref` (link CMS berbahasa ID → `/en/...` di halaman EN).
- `src/i18n/messages.ts` — teks Home (ID+EN) yang tidak punya field CMS.
- `src/styles/home.css`.

## Hasil pemeriksaan

- typecheck, lint, build: lulus.
- Uji otomatis Home (Playwright, server produksi, salinan DB dengan layanan menu dipublish; salinan sudah dihapus): **39/39 lulus**. Satu H1, `lang` benar, 11 klien, 6 kartu layanan, 4 keunggulan, 13 kota, 4 FAQ, testimoni & berita tersembunyi, 2 tombol GARIS non-aktif, tidak ada teks placeholder `[...]`, semua gambar punya alt dan termuat, CTA hero terlokalisasi (`/layanan` ↔ `/en/services`), tanpa error console, tanpa overflow 360–1920px, reveal berjalan setelah scroll, tanpa JS tidak ada konten tersembunyi.
- Uji langkah 2 diulang: 43/43 lulus.
- Performa mobile (lokal): LCP 272 ms, CLS 0, transfer 332 KB. Lighthouse resmi dijalankan di langkah 10.

## Perbaikan saat review

1. URL media Payload absolut (`serverURL`) ditolak `next/image` di port/host lain → `asMedia` mengubahnya jadi path same-origin.
2. Eyebrow section jaringan salah ("Tentang Kami") → "Jaringan Kami"; angka 35+ tidak diulang karena sudah ada di judul.
3. Logo klien: CHINT, Ferbeck, dan allnex berasal dari PDF dalam bentuk kotak berlatar, jadi berubah menjadi blok abu-abu bila grayscale. Untuk sementara ditampilkan berwarna; kembalikan grayscale setelah SVG resmi masuk (komentar di `components.css`).

## Catatan

- Di database dev semua layanan masih draft, jadi section Layanan (dan menu) baru muncul setelah layanan dipublish.
- Form singkat sengaja belum mengirim; diaktifkan di langkah 8.

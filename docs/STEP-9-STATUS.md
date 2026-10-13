# Status langkah 9 — 09 Oktober 2026

**Selesai. Metadata, structured data, sitemap/robots dan semua redirect 301 aktif. Langkah 10 (QA) boleh dimulai.**

## Metadata (`src/lib/seo.ts` → `pageMetadata`)

Setiap halaman (kedua bahasa) memakai satu helper:

- **Title & description** dari CMS (`seo` per halaman/dokumen → intro/summary → `site.seoDefault`). Home memakai judul utuh; halaman lain `Judul | Ape Gale Indonesia`.
- **Canonical** = URL halaman itu sendiri tanpa query (filter `?kategori` dan `?halaman` tidak membuat duplikat).
- **hreflang** `id`, `en`, dan `x-default` (= versi Indonesia).
- **Open Graph & Twitter card** (`summary_large_image`): gambar dari `seo.ogImage` → gambar layanan/cover artikel → `site.seoDefault.ogImage` → `public/brand/og-default.jpg` (1200×630, dibuat `npm run og:image` dari foto hero + logo putih). Detail regulasi/news memakai `og:type=article`.
- `metadataBase` dari `NEXT_PUBLIC_SITE_URL` — **wajib diisi sebelum build** di server produksi.

## Structured data (`src/lib/structured-data.ts`)

| Schema | Di mana | Sumber |
|---|---|---|
| Organization | Home ID/EN | global `site` (alamat, telepon, email, WhatsApp, Instagram) |
| Service | Detail layanan | judul, ringkasan, gambar layanan |
| FAQPage | Setiap blok FAQ (Home, Layanan, GARIS, Hubungi Kami, detail layanan) | **persis** item yang tampil; satu FAQPage per halaman |
| Article | Detail regulasi & news | judul, ringkasan, tanggal, cover |
| BreadcrumbList | Semua halaman dalam (lewat `PageHeader`) | breadcrumb yang tampil |

## Sitemap & robots

- `/sitemap.xml` (`src/app/sitemap.ts`): 7 halaman + semua layanan/regulasi/news yang **published**, masing-masing ID & EN dengan pasangan hreflang. Dibaca per request, jadi konten baru langsung masuk tanpa build ulang.
- `/robots.txt`: semua halaman publik + file PDF (`/api/media/file/`) boleh dirayapi; `/admin` dan `/api/` tidak.

## Redirect 301 (`src/lib/legacy-redirects.ts` → `next.config.ts`)

- Tabel docs/02 + **URL halaman EN lama** (mis. `/greetings/`, `/kitas-kitap-services/`, `/contact-us/`, `/try-garis/`) yang ditemukan di `wp-sitemap.xml` situs lama dan belum ada di docs/02, + 19 posting berita 2021 → `/news`, + 44 PDF lama → file di media CMS.
- Semua `statusCode: 301` (keputusan #25), satu hop, berlaku dengan dan tanpa garis miring akhir. Garis miring akhir di URL lain (`/layanan/`) juga 301 ke versi tanpa garis miring (lewat `proxy.ts`; redirect 308 bawaan Next dimatikan).
- Layanan yang masih draft: URL-nya mengalihkan sementara (307) ke induk terdekat yang sudah publish, bukan 404 (lihat OPEN-QUESTIONS #32).
- Uji ulang kapan saja: `npm run check:redirects -- https://domain` (dijalankan terhadap server yang hidup).

## Hasil pemeriksaan

- `check:redirects`: **214/214** (semua URL lama + garis miring akhir + query tetap terbawa).
- Uji SEO end-to-end: **35/35** — meta lengkap di 12 halaman ID/EN, judul unik, JSON-LD per tipe, FAQPage = FAQ yang tampil, draft → 307 / tak dikenal → 404, sitemap 34 URL semuanya 200 tanpa draft, robots, OG default, PDF lama berakhir di file PDF.
- Unit test **22/22** (24/24 setelah langkah 10) (tambah `tests/redirects.test.ts`: semua 301, sumber unik, setiap baris tabel docs/02 tercakup, tujuan valid), typecheck, lint, build lulus.
- Pertanyaan baru: OPEN-QUESTIONS #29–#34.

# Status langkah 7 — 09 Oktober 2026

**Selesai. Regulasi dan News sudah tayang. Langkah 8 boleh dimulai.**

## Rute

| ID | EN | Isi |
|---|---|---|
| `/regulasi`, `/regulasi/[slug]` | `/en/regulations`, `/en/regulations/[slug]` | Dokumen regulasi + unduhan PDF |
| `/news`, `/news/[slug]` | `/en/news`, `/en/news/[slug]` | Artikel (posts) |

- `ArticlesPage.tsx`: filter kategori `?kategori=`, paginasi `?halaman=` (9 per halaman), keadaan kosong yang jelas. `ArticleDetailPage.tsx`: breadcrumb, tanggal, isi rich text, kartu unduhan (nama file, ukuran).
- Komponen bersama di `src/components/content/Listing.tsx` (CategoryFilter, Pagination, DocCard, EmptyState).

## Migrasi regulasi lama

- `content/seed/regulations.json`: 44 dokumen dari situs lama. `npm run content:regulations` mengunduh PDF ke `.data/legacy-pdfs`, mengunggahnya ke media, lalu membuat entri regulasi.
- **Semua 44 entri berstatus draft** — perlu dicek klien mana yang masih berlaku sebelum dipublish (lihat daftar konfirmasi akhir).
- `content/seed/legacy-pdf-redirects.json`: 44 pemetaan URL PDF lama → halaman regulasi baru, dipakai redirect 301 di langkah 9.
- Bug yang diperbaiki: label EN tidak tersimpan pada array non-localized → penulisan EN kini memakai ulang `id` baris yang sama.

## Hasil pemeriksaan

- Uji langkah 7 **41/41** (memakai salinan DB dengan beberapa entri dipublish lewat API): filter, paginasi, halaman kosong, detail, unduhan, toggle bahasa, 404 untuk slug draft, tanpa overflow 360–1920px.

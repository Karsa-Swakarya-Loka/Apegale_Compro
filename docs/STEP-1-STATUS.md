# Status langkah 1 — 09 Oktober 2026

**Selesai. Langkah 2 boleh dimulai.**

Codex menulis kode langkah 1 tetapi tidak bisa menginstal dependensi (registry npm ditolak di sandbox-nya). Instalasi dan seluruh gerbang Cek dijalankan ulang di mesin owner (Node 22.19.0, npm 11.6.0, SQLite dev).

## Hasil pemeriksaan

| Pemeriksaan | Hasil |
|---|---|
| `npm install` | Lulus — 806 paket, versi terpin di package.json valid di registry (payload 3.90.2, next 16.4.0, react 19.3.0). `package-lock.json` dibuat. Peer dependency `@payloadcms/next` 3.90.2 mengizinkan next ≥16.3.3 <17. |
| `npm run generate` | Lulus — `src/payload-types.ts` dan import map admin dibuat. |
| `npm run migrate:create -- initial_cms` | Lulus — `src/migrations/sqlite/20261008_172538_initial_cms.ts` (99 tabel). |
| `npm run migrate` + `migrate:status` | Lulus — batch 1, Ran = Yes. |
| `npm run seed` ×2 | Lulus — hasil identik kedua kali, tidak ada duplikat (tabel di bawah). File media di disk: 9 asli + turunan ukuran, tidak berlipat. |
| `npm run verify:cms` | Lulus — "CMS integration checks passed on this database." |
| Unit test (`node --experimental-strip-types --test …`) | 9/9 lulus. |
| `npm run typecheck` | Lulus setelah perbaikan (lihat di bawah). |
| `npm run lint` | Lulus, tanpa temuan. |
| `npm run build` | Lulus setelah perbaikan tracing (lihat di bawah). Route: `/admin/[[...segments]]`, `/api/[...slug]`. |
| Runtime `npm run start` | `/admin` 200 dan `/admin/create-first-user` tampil dalam Bahasa Indonesia ("Buat pengguna pertama"). |
| Akses publik REST | `services` 0 dokumen (semua draft; `?draft=true` juga 0 tanpa login), `clients` 11, `inquiries` 403, `users` 403, `globals/home` 403, file media 200. Sesuai rancangan. |

## Perbaikan yang dibuat saat verifikasi

1. **Typecheck (12 error).** `src/seed/store.ts`: konversi tipe hasil Payload ke `Data` sekarang lewat `as unknown as Data` (batas tepercaya antara seed JSON dan tipe generate). `tests/seed.test.ts`: `MemoryStore.find/create` diberi tipe kembalian eksplisit `Promise<Data | undefined>` / `Promise<Data>`. Tidak ada perubahan logika.
2. **Build warning tracing.** `src/collections/Media.ts`: `path.resolve(process.cwd(), process.env.MEDIA_DIR …)` membuat Turbopack menyertakan seluruh proyek ke output server. Ditambah `/*turbopackIgnore: true*/` sesuai saran Next; warning hilang.

## Jumlah dokumen nyata (database dev SQLite)

| Koleksi | ID | EN | Catatan |
|---|---:|---:|---|
| services | 16 | 16 | Semua draft, body kosong (migrasi di langkah 4). |
| testimonials | 0 | 0 | Menunggu klien. |
| clients | 11 | 11 | 5 dengan logo, 6 nama teks. |
| faqs | 5 | 5 | 4 featured. |
| posts | 0 | 0 | — |
| regulations | 0 | 0 | Migrasi di langkah 7. |
| media | 9 | 9 | Dengan alt ID/EN. |
| inquiries | 0 | 0 | — |
| users | 0 | 0 | Admin pertama dibuat owner. |

Lima globals (site, home, about, garis, ui) terisi dua locale.

## Catatan untuk langkah berikutnya

- **Admin pertama** belum dibuat (sengaja; kredensial milik owner). Lokal: isi `ADMIN_EMAIL`/`ADMIN_PASSWORD` di `.env`, `npm run setup:admin`, lalu hapus `ADMIN_PASSWORD`. Di produksi, jalankan `setup:admin` **sebelum** situs dibuka publik, karena `/admin/create-first-user` terbuka selama belum ada user.
- `eslint@9.39.1` berstatus deprecated di npm; tidak memblokir. Pertimbangkan naik ke ESLint yang didukung saat langkah 10.
- Migrasi PostgreSQL belum dibuat (dev memakai SQLite). Buat `migrate:create` dengan `DATABASE_ADAPTER=postgres` saat database produksi tersedia.

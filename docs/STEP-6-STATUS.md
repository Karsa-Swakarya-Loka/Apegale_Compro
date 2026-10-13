# Status langkah 6 — 09 Oktober 2026

**Selesai. Halaman GARIS dan logo klien asli sudah tayang. Langkah 7 boleh dimulai.**

## Halaman GARIS (`/garis`, `/en/garis`)

- Template `src/components/templates/GarisPage.tsx`: header, intro produk, 3 modul (ikon lucide), galeri dua screenshot dari `garis.gallery`, FAQ kategori `garis`, CTA.
- Tombol **Login** dan **Coba Gratis** tampil sebagai "Segera Hadir" / "Coming Soon" (disabled, tetap terbaca pembaca layar) selama `garis.enabled` mati atau URL kosong. Halaman membaca CMS di setiap request, jadi mengaktifkan GARIS **tidak perlu deploy ulang**. Sudah diuji: centang `enabled` + isi URL → tombol berubah jadi tautan aktif.
- Tidak ada klaim pelacakan real time (keputusan #20). Section fitur tetap tersembunyi karena `garis.features` kosong (keputusan #14).

## Logo klien asli + marquee (permintaan owner)

- 11 logo resmi (hanya klien di compro halaman 8) di `design/assets/Clients/official/*.png`, sumber tiap logo dicatat di `SOURCES.md`. Logo yang salah sudah diganti: KSB (sebelumnya penyiar Jepang → KSB SE), Apple, Taiheiyo Cement, Affirmate, Lalamove.
- `npm run content:client-logos` (`scripts/update-client-logos.ts`) mengganti media logo di CMS; `scripts/remove-orphan-media.ts` menghapus 5 media yatim. `src/seed/manifest.ts` sudah menunjuk ke file resmi, jadi seed ulang dari nol tetap memakai logo yang benar (jumlah media = 15).
- `ClientStrip` kini **marquee berjalan**: dua salinan daftar (salinan kedua `aria-hidden`), berhenti saat hover/fokus, ada tombol Jeda/Putar (WCAG 2.2.2), statis bila `prefers-reduced-motion`. Logo `loading="eager"` supaya tidak berkedip saat masuk layar.

## Hasil pemeriksaan

- Uji marquee **12/12**, uji toggle GARIS lulus, `verify:cms` lulus (media = 15).
- typecheck, lint, build lulus.

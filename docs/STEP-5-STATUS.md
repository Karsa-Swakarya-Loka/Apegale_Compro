# Status langkah 5 — 09 Oktober 2026

**Selesai, termasuk revisi visual dari owner. Langkah 6 (GARIS) boleh dimulai.**

## Revisi dari owner (berlaku untuk semua halaman)

1. **Merah kurang dominan dibanding putih.** Sekarang blok maroon penuh berselang-seling dengan putih:
   - Header semua halaman dalam (Layanan, detail layanan, Tentang Kami, dan halaman berikutnya) berlatar `maroon-deep` dengan bidang diagonal `maroon` + garis `red`.
   - Section baru `ag-section--brand`: "Mengapa Ape Gale" dan "Jaringan" di Home, "Mengapa Ape Gale" di Tentang Kami.
   - Urutan Home: hero putih → klien (soft) → layanan (putih) → **keunggulan (maroon)** → GARIS (putih) → **jaringan (maroon, peta putih)** → tentang (putih) → FAQ (soft) → **CTA (maroon)** → **footer (maroon)**.
2. **Foto hero kecil dan tenggelam di bidang merah.** Foto kini mengisi sisi kanan hero (46% lebar, setinggi hero), dipotong diagonal seperti cover compro; merah tinggal dua garis aksen (maroon + red) di tepi potongan, plus gradasi maroon tipis di bawah foto. Di tablet/mobile foto tampil penuh di atas teks dengan potongan diagonal di bawahnya. Lebar teks dibatasi 500px; diukur otomatis, teks tidak pernah menyentuh garis merah di 1024–1920px (jarak minimum 14px di 1024px, ±115px di ≥1280px).

Semua revisi ada di `src/styles/brand.css` (dimuat setelah gaya lain) + `Hero.tsx`, `WhySection`, `NetworkSection` (prop `tone`). **Catatan:** `design/` dan design system online belum mencerminkan revisi ini; perbarui bila design system mau dijadikan acuan lanjutan.

## Halaman Tentang Kami

| Bagian (anchor) | Isi | Sumber |
|---|---|---|
| Header | Breadcrumb, H1, intro | `messages` / `about.intro` |
| Salam dari Kami (`#salam`, foto `#founder`) | Foto founder, sambutan 4 paragraf, nama & jabatan | `about.greeting` (dimigrasi), `home.founder` |
| Profil (`#profil`) | Profil 2 paragraf, kartu Visi (maroon), Misi bernomor 01–04 | `about.profile` (dimigrasi), `about.vision`, `about.mission` |
| Nilai | 3 kartu (Commitment to Service, Adaptive Solutions, Integrity) | `about.values` |
| Mengapa Ape Gale | 4 keunggulan (maroon) | `home.why` |
| Organigram (`#organigram`) | Direktur → 4 kepala bagian → staf; daftar bertingkat (urut untuk pembaca layar), kolom di desktop, 2 kolom tablet, 1 kolom mobile | `about.organigram` |
| Jaringan | Peta + 13 kota (latar soft agar tidak menempel dengan CTA maroon) | `home.network` |
| CTA | WhatsApp + Layanan | — |

- Isi rich text: `content/seed/about-content.json` → `npm run content:about` (`scripts/migrate-about-content.ts`). Sambutan CEO 2021 dirapikan: paragraf Covid-19 dan tagar dihapus (lihat OPEN-QUESTIONS #27).
- Bug yang ditemukan & diperbaiki: paragraf rich text menempel tanpa jarak (RichText membungkus isi dengan elemen tambahan sehingga `gap` tidak berlaku) — sekarang jarak antar blok diatur di `.ag-prose`; juga memperbaiki halaman detail layanan.

## Hasil pemeriksaan

- typecheck, lint, build lulus (route `/tentang-kami`, `/en/about`).
- Uji Tentang Kami: **33/33** — satu H1, 4 anchor, sambutan 4 paragraf tanpa teks Covid, visi + 4 misi, 3 nilai, 4 keunggulan, organigram 11 orang/4 kepala/direktur di atas, 13 kota, `lang` benar, blok maroon ada, menu → Organigram berhenti tepat di bawah header sticky, toggle ID→EN tetap di halaman yang sama beserta anchor-nya, tanpa error console, tanpa overflow 360–1920px.
- Regresi setelah revisi: langkah 2 **43/43**, langkah 3 **39/39**, langkah 4 **41/41** (ekspektasi tes langkah 2 disesuaikan: submenu Expatriate Formalities kini hanya berisi layanan yang dipublish).
- Performa build produksi: LCP 0,7–1,1 dtk (mobile, simulasi 4G), 0,3–0,45 dtk (desktop), CLS 0, transfer ±300–360 KB per halaman.

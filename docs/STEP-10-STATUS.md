# Status langkah 10 — QA terhadap docs/04 (09 Oktober 2026)

**Build selesai. Semua poin docs/04 lulus, kecuali yang menunggu klien (lihat bagian akhir).**

## Checklist docs/04

| Poin | Hasil |
|---|---|
| Visual cocok preview 1440/390 | Dicek per langkah 2–8 (screenshot); revisi merah/putih & hero dari owner sudah masuk. `design/` belum disinkronkan dengan revisi itu. |
| Tanpa hex di luar `tokens.css` | Lulus (mask marquee kini memakai `black`). |
| Tanpa scroll horizontal 360–1920px | Lulus: 19 halaman × 6 lebar. |
| Logo header 40/32px, favicon dari mark | Lulus; favicon 32/192/apple dibuat dari `apegale-mark.png` (`npm run og:image`). |
| Teks ID/EN, toggle bahasa | Lulus (uji langkah 2: 43/43). |
| Fakta resmi sama di header/footer/Hubungi Kami | Lulus. |
| Testimoni & harga tidak dikarang | Lulus: section tersembunyi (belum ada data dari klien). |
| GARIS "Segera Hadir", aktif dari CMS tanpa deploy | Lulus. |
| Hanya 11 logo klien compro | Lulus (logo resmi, marquee). |
| Admin bisa ubah semua konten | Lulus (koleksi/global sejak langkah 1). |
| Draft/publish + **preview draft untuk admin** | **Baru di langkah ini**: tombol Preview di admin → `/preview` (khusus pengguna CMS yang login), bar pratinjau + tombol keluar. Uji 14/14. |
| Seed dua bahasa, bisa diulang | Lulus di SQLite **dan PostgreSQL 16**. |
| Form tersimpan + email | Lulus (langkah 8: 21/21). |
| Metadata, hreflang, canonical, sitemap, robots, schema | Lulus (langkah 9: 35/35). |
| Redirect 301 | Lulus: 214/214. |
| Lighthouse mobile ≥ 90 | Layanan **96**, Detail Layanan **96**, Home **88–91** (berfluktuasi di localhost). Accessibility, Best Practices, SEO **100** di ketiganya. Lihat catatan di bawah. |
| `next/image` webp/avif, `next/font` | Lulus; AVIF diaktifkan. |
| WCAG 2.2 AA | Lulus: satu H1 per halaman, urutan heading tidak melompat (19 halaman × 6 lebar), fokus, keyboard, `aria-current`, label form, reduced motion. |
| `.env.example` lengkap, panduan deploy | Lulus: README bagian **Deploy produksi** (env, rilis pertama, reverse proxy, rilis berikut, backup, cek setelah go-live). |

## Perbaikan selama QA

- **Performa**: 11 logo klien ikut di-preload otomatis oleh React dan berebut bandwidth dengan foto hero → `fetchPriority="low"`. Foto hero `fetchPriority="high"`. Outline peta Indonesia (±50 KB di HTML + payload React) dipindah ke `public/brand/indonesia-land.svg` sebagai CSS mask. Ukuran logo responsif diperbaiki, favicon 45 KB → 1,5 KB, font badan tidak di-preload, section bawah Home memakai `content-visibility`. Hasil: Home dari 73 → 88–91, Layanan 86 → 96.
- **Aksesibilitas**: judul kolom footer `h4` → `h2`; daftar kartu Layanan/Regulasi/News diberi `h2` tersembunyi agar heading tidak melompat (98 → 100).
- **Footer**: tombol WhatsApp mengambang tidak lagi menutupi handle Instagram di baris terakhir.
- **Skrip CMS** tidak keluar sendiri di PostgreSQL (pool tetap terbuka) → `process.exit` eksplisit di semua skrip. `verify:cms` kini menerima database yang sudah berisi 44 regulasi.
- **Migrasi PostgreSQL** `src/migrations/postgres/20261008_194800_initial_cms` dibuat dan diuji: migrate → seed ×2 → semua `content:*` → `verify:cms` → server produksi (semua halaman 200, draft 307, redirect 301, 404 benar).
- Prop `priority` (deprecated di Next 16) diganti.

## Catatan Lighthouse Home

LCP yang terukur nyata 0,5–0,75 dtk dan CLS 0. Angka simulasi (±3,4 dtk) membengkak karena di localhost semua JavaScript selesai sebelum paint pertama, lalu Lighthouse mengalikan waktu CPU itu 4×. Ukur ulang dengan PageSpeed Insights setelah situs live (README → Setelah go-live).

## Hasil akhir

Unit test **24/24**, typecheck, lint, build lulus. Regresi: langkah 2 43/43, langkah 5 33/33, marquee 12/12, langkah 8 21/21, langkah 9 35/35, pratinjau 14/14, redirect 214/214, sweep QA 27/27 (tidak termasuk log 404 bawaan browser pada halaman 404 yang memang diuji). Selisih pada uji lama langkah 3/4/7 disebabkan perubahan yang disengaja (marquee mengganti markup daftar klien; layanan draft kini 307 ke induk; data uji News langkah 7 tidak ada di salinan DB).

## Revisi UI/UX & copy (09 Okt 2026, setelah QA)

Permintaan owner: tampilan lebih profesional ala company profile multipage, copy lebih bersih, marquee logo klien permanen.

- **Marquee logo klien permanen**: tombol jeda/putar dihapus, tidak berhenti saat kursor di atasnya (`ClientStrip`, `brand.css`). Satu-satunya pengecualian: pengaturan OS "kurangi gerakan" menampilkan logo statis (bukan tombol, bukan hover). Catatan: WCAG 2.2.2 menganjurkan ada cara menghentikan gerakan >5 detik; ini keputusan owner, dicatat agar tidak dianggap bug.
- **Label kecil merah ("eyebrow") dikurangi**: sebelumnya ada di hampir setiap section sehingga ritme halaman terasa template. Sekarang hanya di hero (tagline compro), label strip logo, dan blok "Mengapa Ape Gale" di Home. Header halaman dalam cukup breadcrumb + judul. Label fungsional (Visi/Misi, "Kantor & kontak", daftar layanan di sidebar) tetap.
- **Satu label per maksud CTA**: semua tombol WhatsApp = "Chat WhatsApp" (sebelumnya campur "Tanya via WhatsApp", "Tanya layanan ini"); tombol utama brand tetap "Konsultasi Gratis". Tombol WA ganda di header detail layanan dan tombol Login ganda di halaman GARIS dihapus.
- **Copy**: judul "Layanan Kami", "Nilai yang kami pegang", "Lebih dari 20 tahun mendampingi perusahaan dan ekspatriat di Indonesia", "Kirim pesan", intro Regulasi, ringkasan 6 layanan utama ditulis ulang (ID & EN), judul SEO tanpa em-dash. Sumber tetap di `content/seed/*.json`; skrip baru **`npm run content:copy`** (`scripts/sync-copy.ts`) menyalin copy dari seed ke CMS tanpa mengubah status/isi lain.
- `content-visibility` di Home dihapus (section bawah tampil kosong saat cetak/screenshot penuh).
- Uji: marquee 7/7, unit 24/24, typecheck, lint, build lulus.

## Revisi copy: teks situs lama apa adanya (09 Okt 2026)

Keputusan owner: seluruh copywriting memakai teks apegale.com lama tanpa dikurangi/ditambah. Sumber: `legacy/*.html` (33 halaman rebuild situs lama), dicek silang dengan situs live.

- **Ekstraksi otomatis** (`scratchpad` → `content/seed/services-content.json`, `about-content.json`, `garis.json`): isi 16 halaman layanan, Salam dari Kami (lengkap termasuk paragraf Covid-19 dan tagar), Profil Perusahaan, visi/misi/nilai, GARIS (intro, 3 modul + isi sub-halaman, 10 fitur "Our Feature"). Kerusakan encoding situs lama (`�`, kata tergabung karena tag hilang) diperbaiki tanpa mengubah ejaan.
- **Home**: hero "Ape Gale Indonesia / Conversant Expatriate Services" + paragraf pembuka asli, tombol "Lebih Lanjut"; ringkasan 6 layanan = teks "Layanan Ape Gale" situs lama; blok "Tentang Kami" memakai paragraf profil; GARIS memakai teks home lama.
- **Label**: "Request Penawaran" (header + CTA, ke Hubungi Kami), "WhatsApp", "Ada yang bisa kami bantu?" (tombol WA mengambang), "Selengkapnya...", "Kirim"; label formulir sesuai situs lama; judul "Enactments" dengan 5 kategori dan intro per kategori; "Berita Ape Gale"/"Ape Gale News"; judul SEO "Conversant Expatriate Services | PT Ape Gale Indonesia".
- **EN**: terjemahan setia dari teks lama (situs lama tidak punya EN), kamus 261 kalimat; struktur blok ID/EN divalidasi sama.
- Skrip: `npm run content:copy` kini juga menyinkronkan about (visi/misi/nilai) dan garis (intro/modul/fitur). Batas `summary` layanan dinaikkan ke 600 karakter (validasi saja, tanpa migrasi).
- Tidak diubah (bukan dari situs lama, sumber compro/perencanaan, menunggu keputusan #35): "Mengapa Ape Gale", angka 20+/35+, logo klien, peta, FAQ, founder/organigram 2026.
- Uji: unit 24/24, typecheck, lint lulus; screenshot 1440/390 untuk Home, Tentang Kami, Layanan, detail layanan, GARIS, Enactments, Hubungi Kami, EN.

## Revisi navbar & organigram (09 Okt 2026)

- **Navbar**: link anchor di submenu Tentang Kami (#salam, #profil, #founder, #organigram) tidak lagi ditandai sebagai "halaman aktif" (sebelumnya keempatnya tersorot merah sekaligus). Tombol "Request Penawaran" adalah link internal, jadi tidak membuka tab baru lagi (desktop + mobile); hanya link luar (WhatsApp) yang membuka tab baru. Dropdown dirapikan: rata dengan teks menu, jarak 4px, jembatan hover tak terlihat agar panel tidak tertutup saat kursor pindah, item 14px/500, submenu level-2 lebih ringan; label + chevron ikut berwarna merek saat hover/terbuka.
- **Organigram**: ditata ulang sebagai bagan sungguhan: direktur → garis turun → rel → garis ke tiap manajer (digambar per kolom sehingga selalu tepat di tengah kartu, berapa pun jarak kolom) → anggota bertumpuk di bawah manajer dengan garis pendek, lebar kolom sama, tanpa indentasi; bayangan hanya pada kartu direktur dan manajer, anggota memakai garis tipis. Bug spesifisitas (`.ag-org ul` mengalahkan `padding-top`) yang membuat kartu direktur menimpa rel diperbaiki. Tablet: 2 kolom tanpa rel; mobile: 1 kolom.
- Uji: langkah 2 **43/43**, langkah 5 **33/33** (ekspektasi sambutan diperbarui ke 7 paragraf asli), unit 24/24, typecheck, lint, build lulus.

## Penyederhanaan UI dan parafrase (09 Oktober 2026)

Permintaan owner terbaru mengizinkan parafrase dan merapikan UI. Ini menggantikan ketentuan sebelumnya untuk menampilkan copy legacy secara verbatim; sumber asli tetap utuh di legacy/.

- Copy ID/EN: hero, ringkasan enam layanan, tujuh detail layanan publik, profil/sambutan, visi/misi/nilai, GARIS, CTA, formulir, dan intro halaman diperjelas. Nama resmi layanan, angka, kontak, founder, dan cakupan bisnis tetap. Teks historis pandemi dan tagar tidak lagi menjadi sambutan situs saat ini.
- Klaim umum seperti “memberi kepastian”, “hasil optimal”, janji kecepatan, dan akses GARIS real time yang belum aktif dihapus. Label campuran seperti “Request Penawaran”, “Our Feature”, dan “Please select an option” pada halaman ID diganti.
- Layout: hero mobile menampilkan copy dan CTA sebelum foto; statistik dua kolom; sublayanan cukup di halaman Layanan; jarak antarsection 96/64/48px untuk desktop/tablet/mobile; judul dan panjang baris lebih terkontrol.
- Komponen: kartu datar tanpa gerakan mengambang, ikon tanpa lingkaran dekoratif, FAQ dengan garis pemisah, daftar fitur GARIS tanpa tumpukan kartu, blok nilai/keunggulan lebih terbuka, formulir lebih lapang. Error state berlaku pada input, select, dan textarea.
- Identitas marun/putih, foto, ticker 11 klien, serta reveal ringan dan reduced motion dipertahankan. Token baru ditulis di design/tokens.json dan CSS diregenerasi.
- Copy disinkronkan ke CMS SQLite lokal dengan scripts/sync-copy.ts, scripts/migrate-about-content.ts, dan scripts/migrate-services-content.ts --published-only. Opsi terakhir memperbarui deskripsi yang sudah published tanpa menyentuh badan draft legal. Cadangan sebelum perubahan tersedia di .data/ui-polish-backup-20261009/.

Validasi revisi ini: 24/24 unit test, lint, typecheck, dan build produksi. HTTP/HTML 16 route ID/EN memberi 200, satu H1, dan copy baru; ini bukan pengujian visual atau interaksi browser. Perbandingan SQLite mengonfirmasi status/struktur layanan, harga, klien, statistik, kota, organigram, pengaturan GARIS, galeri, foto, regulasi, dan berita tidak berubah.

**Pemeriksaan visual 1440px/390px masih perlu dilakukan:** browser CUA tidak tersedia pada sesi revisi ini. Hasil visual dan Lighthouse dari QA sebelumnya tidak dapat dianggap sebagai validasi untuk revisi ini.

## Perilaku navbar setelah memilih tujuan (09 Oktober 2026)

- Semua link navbar, submenu, CTA internal, dan logo menutup menu melalui `onNavigate`, termasuk klik halaman yang sama dan anchor. Ctrl/Cmd-click tetap mengikuti perilaku Next.js untuk tab baru.
- Dropdown desktop dikendalikan satu state; CSS hover/focus tidak dapat membukanya kembali setelah klik atau Escape. Submenu tertutup memakai inert.
- Navigasi navbar ke halaman biasa kembali ke atas dan memindahkan fokus ke konten; link anchor menuju section terkait. Navigasi Back/Forward tanpa klik navbar tetap mengikuti restorasi scroll Next.js.
- Menu mobile membuka kunci scroll setelah memilih tujuan, Escape, atau beralih ukuran layar. Fokus keyboard tetap berada pada kontrol header/menu selama panel terbuka. Posisi panel mengikuti sisi bawah header sebenarnya, termasuk topbar tablet.
- Area klik chevron berukuran 44px tanpa pseudo-element yang menimpa label halaman; ukuran ikon tetap. Penanda halaman persis memakai aria-current=page dan bagian induk memakai aria-current=location.

Validasi: 27 unit test (termasuk route, active state, dan anchor ID/EN), lint, typecheck, serta build produksi. Pemeriksaan HTTP terhadap seluruh 36 tujuan unik navbar ID/EN memberi 200; delapan anchor ditemukan pada HTML tujuan. Uji klik, fokus, dan scroll di browser nyata belum dapat dijalankan karena CUA melaporkan tidak ada browser yang tersedia.

## Revisi layanan visa (22 Okt 2026, permintaan Reza 18 Okt 2026)

Keputusan #38–#41 di docs/OPEN-QUESTIONS.md.

- **Struktur**: Visa & Paspor kini punya dua anak, `visa-indonesia` (Visa Indonesia / Indonesian Visas) dan `visa-global` (Visa Global / Global Visas), keduanya `showInMenu` dan dipublish bersama induknya. Enam sub-visa 2021 dihapus; seed kini menghapus slug yang tercantum di `retiredServices` (manifest) sehingga database lama ikut bersih saat `npm run seed`. Total layanan 16 → 12 (10 publish, 2 draft KITAS).
- **Isi** (`services-content.json`): Visa & Paspor memuat dua kelompok dengan kode visa dari klien; tiap halaman anak memuat daftarnya sendiri. Kalimat fasilitas diskon MoU ditambahkan di ketiga halaman, di FAQ Layanan baru (`faq-mou-discount`, kunci ke-6 di manifest) dan di catatan harga `ui.price.note`.
- **Redirect**: `/vitas/`, `/multiple-business-visa/`, `/visa-kunjungan/`, `/visa-tinggal-terbatas-penyatuan-keluarga/`, `/visa-on-arrival/`, `/visa-pelajar/` dan padanan EN-nya kini 301 ke `/layanan/visa-paspor` atau `/en/services/visa-paspor`. Jumlah redirect tetap 214.
- **Database lokal**: cadangan di `.data/visa-revision-backup-20261022/apegale.db`, lalu `npm run seed` → `npm run content:services` → `npm run content:copy`.
- **Uji**: unit 27/27, typecheck, lint, `next build` lulus; `check:redirects` 214/214; HTTP 200 untuk `/layanan`, `/layanan/visa-paspor`, `/layanan/visa-indonesia`, `/layanan/visa-global` dan padanan EN; `/layanan/kitas-kitap` tetap 307 ke induk; `/layanan/vitas` 404 (URL lama tidak pernah mengarah ke sana). Pemeriksaan visual browser belum dilakukan.
- **Catatan teknis**: `next dev` dan `next build` gagal dengan pesan "Failed to open database / invalid digit found in string" atau "Can't resolve @vercel/turbopack-next/internal/font/google/font" bila ada `desktop.ini` Google Drive atau cache Turbopack basi di `.next`. Hapus `desktop.ini` di `.next` (atau seluruh `.next/cache/turbopack` dan `.next/dev`) sebelum menjalankan. Perubahan `legacy-redirects.ts` baru terbaca setelah `.next/dev` dihapus.

## Visa sebagai sub-kategori di kartu dan menu (22 Okt 2026, keputusan #42)

Owner menolak seksi baru di Beranda; hierarki Expatriate Formalities → Visa & Paspor → Visa Indonesia / Visa Global tetap.

- **Kartu layanan** (`ServiceCard`): sub-layanan boleh punya anak; anak ditampilkan menjorok di bawah induknya (`.ag-service__subs ul`). `getTopServices` kini membawa dua tingkat turunan yang published. Kartu di Beranda (`ServicesSection`) menampilkan sub-layanan seperti halaman Layanan, sehingga Visa Indonesia dan Visa Global terbaca langsung dari Beranda di dalam kartu Expatriate Formalities.
- **Navbar** (`HeaderNav`): tingkat ketiga di bawah Layanan dirender menjorok (`.ag-nav__sub3` desktop, `data-nested="2"` mobile); `SiteShell` meneruskan anak Visa & Paspor tanpa meratakan.
- Tidak ada seksi, teks, atau kolom CMS baru.
- Uji: unit 27/27, typecheck, lint, `next build` lulus; HTTP 200 dan tautan visa terbaca di `/`, `/en`, `/layanan`, `/en/services`; tangkapan layar 1440 kartu Beranda dan dropdown.

## Navbar flyout dan grid layanan Beranda (22 Okt 2026, keputusan #43)

- **Navbar** (`HeaderNav.tsx`, `shell.css`): item yang punya anak di tingkat ketiga (`.ag-nav__group`) menampilkan chevron dan membuka panel `.ag-nav__fly` di sebelah kanannya saat hover, fokus, atau Tab; jembatan hover tak terlihat agar panel tidak tertutup saat kursor pindah. Mobile tetap daftar menjorok (`data-nested="2"`).
- **Beranda, seksi Layanan** (`ServicesSection.tsx`, `home.css`): layout kolom kiri lengket + indeks dua kolom diganti baris judul (judul kiri, "Lihat layanan" kanan) di atas grid tiga kolom (`.ag-services__grid`). Tiap entri memakai baris grid `auto auto 1fr auto` sehingga judul, ringkasan, sub-layanan, dan "Selengkapnya" sejajar di seluruh baris; padding entri 24px (sebelumnya 32/40). `.ag-grid--index` dihapus (tidak dipakai lagi).
- Uji: unit 27/27, typecheck, lint, `next build` lulus; tangkapan layar 1440: grid 3×2 sejajar, flyout Visa Indonesia / Visa Global tampil di samping Layanan Visa & Paspor.

## Seksi Layanan Beranda: sistem visual "dosir" (22 Okt 2026, keputusan #45)

- **Arah**: editorial lemari arsip. Jangkar visual = folio Expatriate Formalities (`.ag-folio`): angka 02 outline Montserrat 96px, rel maroon 3px di kiri, pohon arsip (`.ag-folio__tree`) dengan tab miring skewX(-24deg) (slash merek) untuk Layanan Visa & Paspor → Visa Indonesia / Visa Global. Lima layanan lain = ledger (`.ag-ledger__list`): angka outline, judul kapital, ringkasan, panah, di atas hairline. Grid 5/7 asimetris; satu kolom di bawah 1024px.
- **Dibuang di seksi ini**: gradasi merah pada hover, kartu kotak sama tinggi, grid 3 kolom yang seragam. Hanya maroon datar dan garis.
- **Motion** (`home.css`, `motion.css`): rel folio menggambar diri (scaleY 700ms), item folio dan baris ledger masuk berurutan lewat `--i` (70–80ms), baris geser 12px + angka terisi maroon saat hover/fokus; `html { scroll-behavior: smooth }`; tiap `.ag-section > .ag-container` naik 28px saat masuk layar lewat `animation-timeline: view()` (di dalam `@supports`, browser lain tampil biasa). Reduced motion mematikan semuanya (aturan global yang sudah ada).
- `ServicesSection.tsx` ditulis ulang; `ServiceCard` tetap dipakai halaman Layanan.
- Uji: unit 27/27, typecheck, lint, `next build` lulus; tangkapan layar 1440 dan lebar ponsel; tanpa scroll horizontal. Interaksi hover/keyboard belum diuji di browser nyata, hanya lewat CSS.

## Manpower Supply dihapus dan seksi Layanan dirapikan (22 Okt 2026, keputusan #46)

- Manpower Supply bukan layanan Ape Gale: dihapus dari seed, tes, `verify:cms`, redirect (`/manpower-supply/` → `/layanan`, EN → `/en/services`), dan database lewat `retiredServices`. Ini sekaligus menjelaskan #44 (penghapusan sebelumnya disengaja). Hero: lead ID/EN tanpa klaim alih daya, judul EN "Expatriate permits & foreign workers" (`content:copy`).
- Seksi Layanan Beranda (penyempurnaan #45): angka outline besar diganti label kecil Montserrat (02 dengan garis pendek di folio; 01–05 abu yang berubah maroon saat hover di ledger), rel 2px, tab pohon 10/7px, geser hover 8px. Struktur folio + ledger, maroon datar, dan animasi masuk tetap. Dengan 5 layanan, tinggi folio dan ledger kini seimbang.
- Uji: unit 27/27, typecheck, lint, `next build` lulus; `check:redirects` 214/214; tangkapan layar 1440.

## Seksi Layanan Beranda jadi interaktif (22 Okt 2026, keputusan #47)

- `ServicesSection.tsx` (server) kini hanya menyusun data (nomor 01–05 sesuai urutan CMS, indeks bawaan = layanan yang punya sub-layanan) dan merender `ServicesDossier.tsx` (client) di dalam satu `Reveal`.
- `ServicesDossier`: ledger kanan = `ol[role=tablist]` berisi `button.ag-ledger__row[role=tab]` (semua layanan, berurutan); folio kiri = `div.ag-folio[role=tabpanel]` dengan `.ag-folio__panel` ber-`key` slug sehingga React memasang ulang isi saat ganti. Fase `data-phase="out"` → `"in"` (160ms) menggerakkan animasi di `home.css`: lembar lama naik dan memudar, rel `::before` menggambar ulang (560ms), lembar baru naik (420ms), item pohon mengikuti (`--i` × 50ms). Panah atas/bawah/kiri/kanan/Home/End memindahkan fokus dan pilihan; folio di-scroll ke pandangan (`scroll-margin-top` header) bila kepalanya tersembunyi. Reduced motion: ganti langsung tanpa fase.
- Baris terpilih: rel 2px maroon tetap, angka dan judul maroon, geser 8px, panah berputar menunjuk folio (kiri di dua kolom, atas di satu kolom). Judul ledger kini `span.ag-ledger__title` (bukan h3 di dalam tombol); h3 tetap di folio.
- Uji: unit 27/27, typecheck, lint, `next build` lulus; di Chrome 1440 dan 485px: klik baris 01/03 menukar folio dengan animasi (opacity 0,05 di fase keluar → 1), `aria-selected` dan `aria-labelledby` berpindah, ArrowDown dan End berpindah fokus + pilihan, tanpa pesan konsol.

## Seksi Layanan Beranda dirapikan (22 Okt 2026, keputusan #48)

- `.ag-ledger` `align-items: stretch`, gap kolom `--space-16`; `.ag-services` gap `--space-10`. `.ag-folio` = grid dengan `border-top` kuat dan `border-bottom` tipis; setiap `.ag-folio__panel` di `grid-area: 1/1`, yang nonaktif `visibility: hidden; opacity: 0` (+ `aria-hidden` dan `inert` di markup) sehingga tinggi folio stabil = lembar tertinggi. `<1024px`: lembar nonaktif `display: none`.
- Ledger: `.ag-ledger__list` grid `grid-auto-rows: minmax(0,1fr)`; baris = nomor + judul + panah, `align-items: center`, `min-height` 64px (44px di ponsel). Markup ringkasan (`.ag-ledger__sum`) dihapus dari `ServicesDossier.tsx`.
- Pohon folio dipadatkan (gap 4px, item 34/28px); "Selengkapnya" langsung di bawah isi.
- Uji: unit 27/27, typecheck, lint, `next build` lulus; Chrome 1440: kedua kolom 392px, baris 78px rata, tinggi tetap saat klik 04/05, animasi tukar tetap jalan; 485px: tinggi alami, baris 51px, tanpa konsol error.

## Seksi Layanan Beranda: sistem "register arsip" (22 Okt 2026, keputusan #49)

- `home.css` blok "Services: the register": `.ag-folio__tab` dan `.ag-ledger__tab` berbagi geometri (46×24px, `skewX(-24deg)`, span dalam di-unskew); tab indeks bergaris `--line-strong`, hover maroon + geser 3px, terpilih terisi maroon/`--on-brand`. `.ag-ledger__list::before` = benang (`left: -gutter-1px`, lebar gutter+29px, `top: calc((var(--k)+0.5)*100%/var(--n) - 1px)`, transisi `top` 420ms), `::after` = tab sandaran 10×16px di tepi kanan lembar (`border-right` tipis pada `.ag-folio`). Saat reveal, benang `scaleX(0)` → 1 (origin kanan) dan sandaran `scale(0)` → 1 dengan delay 420ms.
- `ServicesDossier.tsx`: state `selected` (tab dan benang bergerak seketika) terpisah dari `active` (lembar yang tampil, berganti setelah fase keluar 160ms); `--k`/`--n` di-set inline pada `ol[role=tablist]`; markup nomor dan panah diganti tab.
- Uji: unit 27/27, typecheck, lint, `next build` lulus; Chrome 1440: benang tepat di tengah baris terpilih (selisih 1px), meluncur ke 04 saat diklik, lembar bertukar; 485px: benang tersembunyi, baris ≥44px, tanpa overflow horizontal, tanpa konsol error.

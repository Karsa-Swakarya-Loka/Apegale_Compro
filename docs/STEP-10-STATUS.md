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

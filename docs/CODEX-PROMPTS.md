# Prompt Codex — urutan eksekusi

Jalankan berurutan, satu prompt per sesi/langkah. Jangan lanjut sebelum "Cek" di langkah itu lolos.
Setiap prompt sudah mengasumsikan Codex dibuka di folder `web/`.

---

## 0. Orientasi & rencana
```
Baca AGENTS.md, lalu semua file di bagian "Read first" (docs/01–04, design/README.md, setiap design/components/*/README.md dan preview.html, content/seed/*.json, docs/OPEN-QUESTIONS.md).

Jangan menulis kode dulu. Buat docs/PLAN.md berisi:
1. Ringkasan proyek dalam 5 poin.
2. Struktur folder aplikasi yang akan kamu buat (src/app, src/collections, src/globals, src/components, src/styles, src/seed, src/i18n).
3. Pemetaan setiap komponen design/components/* ke komponen React (nama file + props).
4. Pemetaan setiap template di docs/02 ke route Next.js (ID dan /en).
5. Urutan 10 langkah dari "Working agreement" dengan kriteria selesai per langkah.
6. Daftar asumsi/pertanyaan baru (tambahkan juga ke docs/OPEN-QUESTIONS.md).

Cek: tunjukkan isi PLAN.md.
```

## 1. Setup Next.js + Payload + koleksi + seed
```
Kerjakan langkah 1 dari PLAN.md.
- Buat app Next.js (App Router, TypeScript) + Payload CMS 3 di folder app ini (create-payload-app, template blank). Pin versi di package.json.
- Database Postgres via @payloadcms/db-postgres, konfigurasi dari env; siapkan .env.example (DATABASE_URI, PAYLOAD_SECRET, NEXT_PUBLIC_SITE_URL, SMTP_*). Sediakan cara mudah beralih ke @payloadcms/db-sqlite untuk dev lokal.
- Localization id (default) + en, fallback aktif.
- Buat semua globals dan collections persis seperti docs/03-cms-payload.md (field, localized, drafts, access, validasi consent testimoni, role admin/editor).
- Buat script seed (npm run seed) yang membaca content/seed/*.json, upsert by slug/name, mengunggah gambar dari design/assets ke media, mengisi kedua locale, dan aman diulang. Field konten yang berisi "source"/"note" (body layanan) biarkan kosong dulu.
- Jangan membuat halaman frontend apa pun di langkah ini.

Cek: jalankan migrasi + seed dua kali (tidak boleh ada duplikat), build, lint, typecheck. Laporkan jumlah dokumen per koleksi per locale.
```

## 2. Layout shell & design tokens
```
Kerjakan langkah 2.
- Salin design/tokens.css dan design/components.css ke src/styles/, impor global. Ganti @import Google Fonts dengan next/font (Jost → --font-display, Source Sans 3 → --font-body).
- Routing i18n: ID tanpa prefix, EN di /en, segmen statis dilokalkan sesuai tabel di docs/02. Buat helper mapping route ID↔EN dan kamus UI dari content/seed/ui-dictionary.json.
- Buat komponen React yang menghasilkan markup & kelas ag-* yang sama dengan preview: Header (topbar + nav dengan dropdown Layanan dari CMS + CTA), LanguageToggle (pindah ke halaman setara tanpa full reload, simpan localStorage 'apegale-language', update <html lang>), Footer, WhatsAppFloat, CTA banner, Button, SectionHeading.
- Menu mobile: hamburger + panel penuh, bisa dipakai keyboard, toggle bahasa tetap terlihat.
- Semua data kontak dari global site, tidak di-hardcode.

Cek: buka halaman kosong di / dan /en, bandingkan Header/Footer/WhatsAppFloat/LanguageToggle dengan design/components/*/preview.html di 1440px dan 390px. Pastikan tidak ada warna/spasi hardcode di luar tokens.css (grep). Build, lint, typecheck.
```

## 3. Home
```
Kerjakan langkah 3: halaman Home (/ dan /en) dengan 11 section sesuai urutan di docs/02, data dari global home + koleksi.
- Hero persis seperti design/components/Hero (bidang diagonal, StatBadge dari site.stats).
- ClientStrip: 11 klien; klien tanpa logo tampil sebagai teks nama.
- ServiceCard grid: 6 layanan utama (parent kosong), urut sesuai order.
- Why Ape Gale, GARIS (tombol non-aktif bila garis.enabled=false), Jaringan (peta Indonesia SVG ringan dengan 13 titik kota), Founder, Testimoni (sembunyikan bila kosong), FAQ (featured, <details>), News (3 terbaru gabungan posts+regulations), CTA + form ringkas.
- Semua section bisa disembunyikan lewat home.sectionsVisible.

Cek: screenshot 1440px dan 390px untuk ID dan EN, bandingkan dengan preview komponen terkait. Lighthouse mobile Home ≥ 90 di keempat kategori. Build, lint, typecheck.
```

## 4. Layanan, Detail Layanan, Price List
```
Kerjakan langkah 4.
- /layanan (+ /en/services): header halaman diagonal, grid 6 layanan, Price List ringkas (priceItems featured dari semua layanan, PriceTable), FAQ kategori layanan, CTA.
- /layanan/[slug]: breadcrumb, header + CTA WhatsApp dengan pesan otomatis berisi nama layanan, body rich text, kartu sub-layanan (anak dari services.parent), requirements, tabel harga layanan ini, FAQ terkait, layanan lain, CTA. generateStaticParams untuk semua slug di dua locale.
- Migrasi isi body: untuk setiap layanan, ambil teks dari file lama yang disebut di content/seed/services.json (body.source, folder legacy/), rapikan jadi rich text bahasa Indonesia, terjemahkan ke English, simpan lewat seed. Jangan bawa HTML/CSS lama. Tandai di docs/OPEN-QUESTIONS.md setiap kode/durasi visa yang kemungkinan sudah berubah.
- Harga kosong tampil "Hubungi kami"; jangan mengarang angka.

Cek: semua 16 halaman layanan render di ID dan EN, tabel harga tidak membuat halaman scroll horizontal di 360px, schema Service + BreadcrumbList valid. Build, lint, typecheck.
```

## 5. Tentang Kami
```
Kerjakan langkah 5: /tentang-kami (+ /en/about) dengan anchor #salam, #profil, #founder, #organigram sesuai docs/02.
- Isi Salam dari Kami dan Profil dari legacy/salam-dari-kami.html dan legacy/profil-perusahaan.html (rapikan, terjemahkan EN, simpan ke global about lewat seed).
- Visi, misi, nilai, keunggulan dari global; organigram dari about.organigram sebagai bagan pohon yang responsif (di mobile jadi daftar bertingkat).

Cek: anchor dari menu dropdown berfungsi, tampilan 1440/390 rapi, build/lint/typecheck.
```

## 6. GARIS
```
Kerjakan langkah 6: /garis (+ /en/garis) dari global garis.
- Intro produk, 3 varian, screenshot (garis-dashboard, garis-expat-monitoring), anchor #coba-gratis.
- Saat enabled=false: tombol Login & Coba Gratis aria-disabled dengan label "Segera Hadir"/"Coming Soon" (gaya Button disabled) + tombol "Tanya via WhatsApp". Saat enabled=true dan URL terisi: tombol aktif. Uji kedua keadaan.

Cek: ubah enabled di admin → halaman berubah tanpa deploy ulang (revalidate). Build, lint, typecheck.
```

## 7. Regulasi & News
```
Kerjakan langkah 7.
- /regulasi dan /news (+ EN): header, filter kategori via query (?kategori=), grid NewsCard 9 per halaman, pagination.
- Detail: breadcrumb, judul, tanggal, kategori, isi, lampiran PDF (tombol Unduh PDF), terkait, CTA. Kartu tanpa gambar memakai latar maroon-deep.
- Migrasi regulasi dari legacy/enactments-*.html dan legacy/ketentuan-*.html: buat entri regulations per dokumen, unduh PDF dari apegale.com/wp-content/uploads ke media CMS, simpan map URL lama → baru untuk redirect. Jangan migrasi berita Covid 2021.

Cek: semua PDF bisa diunduh dari domain sendiri, filter & pagination jalan, schema Article valid. Build, lint, typecheck.
```

## 8. Hubungi Kami & form
```
Kerjakan langkah 8: /hubungi-kami (+ /en/contact).
- Info kontak dari global site, ContactForm lengkap persis design/components/ContactForm (label, error dengan ikon + kalimat perbaikan, pesan sukses dari kamus).
- Route handler: validasi server, honeypot, rate limit sederhana per IP, simpan ke inquiries (dengan locale), kirim email notifikasi ke site.email via SMTP env. Tombol WhatsApp di samping Kirim.
- Peta: link "Buka di Google Maps" (+ gambar statis bila ada), tanpa iframe.

Cek: kirim form valid & tidak valid di ID dan EN, data masuk admin, email terkirim (pakai SMTP test/ethereal di dev). Build, lint, typecheck.
```

## 9. SEO, redirect, sitemap
```
Kerjakan langkah 9.
- generateMetadata untuk semua halaman dari CMS (title, description, OG image), fallback ke site.seoDefault.
- hreflang id/en + x-default, canonical, sitemap.xml (semua halaman & dokumen published, dua locale), robots.txt.
- Schema.org: Organization (Home), Service, FAQPage, Article, BreadcrumbList.
- Semua redirect 301 dari tabel docs/02 + map PDF lama di next.config redirects(). Cek ulang daftar URL lama dari https://apegale.com/sitemap_index.xml dan tambahkan yang belum ada.
- Favicon & app icon dari design/assets/Logos/apegale-mark.png.

Cek: uji setiap URL lama → 301 ke tujuan yang benar (buat script tes), validasi structured data, Lighthouse SEO ≥ 90.
```

## 10. QA akhir & panduan deploy
```
Kerjakan langkah 10.
- Periksa setiap poin docs/04-acceptance.md, centang yang lolos, dan perbaiki yang gagal. Laporkan sisa yang belum bisa diselesaikan beserta alasannya.
- Uji di 360, 390, 768, 1024, 1440, 1920px; navigasi keyboard penuh; prefers-reduced-motion.
- Lighthouse mobile untuk Home, Layanan, Detail Layanan, Hubungi Kami (semua kategori ≥ 90).
- Tulis README.md bagian Deploy untuk hosting Node.js klien: syarat server, env, build & start, migrasi DB, folder media persisten, backup DB+media, cara membuat akun admin pertama, cara mengaktifkan GARIS.
- Perbarui docs/OPEN-QUESTIONS.md dengan semua hal yang masih menunggu klien.

Cek: tampilkan tabel ringkas hasil acceptance (lolos/gagal) dan skor Lighthouse.
```

---

## Prompt bantu (kapan saja)

**Koreksi visual**
```
Halaman <nama> belum sesuai design/components/<Komponen>/preview.html di <lebar>px: <jelaskan bedanya>. Perbaiki hanya dengan token & kelas ag-* yang ada; jangan menambah nilai hardcode. Tunjukkan diff dan screenshot sebelum/sesudah.
```

**Cek kepatuhan aturan**
```
Audit seluruh src terhadap "Hard rules" di AGENTS.md: nilai hardcode di luar tokens.css, teks UI satu bahasa, konten yang dikarang (testimoni/harga/angka), logo klien di luar 11 nama, link GARIS aktif saat enabled=false. Laporkan temuan dengan file:baris, lalu perbaiki.
```

**Update dari design system**
```
design/tokens.json dan design/components/<Komponen> baru diperbarui. Regenerate src/styles/tokens.css dari tokens.json, sinkronkan components.css, dan sesuaikan komponen React yang terdampak. Jangan ubah yang lain.
```

**Konten baru dari klien**
```
Klien mengirim <testimoni/harga/foto/logo> (lampiran/teks di bawah). Masukkan ke content/seed/<file>.json (ID + EN), jalankan seed, pastikan section terkait muncul, dan hapus item terkait dari docs/OPEN-QUESTIONS.md.
```

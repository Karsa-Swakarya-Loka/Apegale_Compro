# Riset UI/UX — Redesign Website Company Profile Apegale

Dasar: Surat Penawaran **QTN-WEB-APG-2026-003** & Invoice DP **INV-WEB-APG-2026-001** (08 Okt 2026).
Sumber riset: Company Profile PDF 2026 (10 hal.), Instagram @apegaleindonesia, website lama apegale.com, referensi klien letsmoveindonesia.com.
Screenshot pendukung: folder `screenshots/`.

---

## 1. Batas pekerjaan (dari quotation)

| # | Komponen | Waktu | Catatan untuk UI/UX |
|---|---|---|---|
| 1 | Riset & struktur halaman | Minggu 1 | Dokumen ini + sitemap (bagian 7) |
| 2 | UI/UX design multi-page | Minggu 1 | Home, About, Services + detail layanan, GARIS, News, Contact |
| 3 | Development responsive | Minggu 1–2 | Desktop + mobile, menu dropdown, CTA WhatsApp |
| 4 | CMS | Minggu 2 | Teks, gambar, layanan, **regulasi** & berita bisa diedit |
| 5 | SEO dasar, QA, go-live | Minggu 2 | Deploy ke hosting klien |

Revisi desain maksimal **2 kali**. Total waktu **2 minggu**, jadi UI harus selesai dan di-ACC di **akhir minggu 1**. Karena itu desain dibangun dari **template halaman**, bukan desain per halaman (lihat bagian 7).

---

## 2. Profil brand (sumber utama: Compro PDF 2026)

- **Nama:** PT Ape Gale Indonesia. Tagline compro: *Conversant Expatriate Services* — "Solutions Are Our Expertise".
- **Bidang:** layanan perizinan ekspatriat (TKA), *expatriate hosting*, *manpower supply*, *management advisory*. Klien dari industri asuransi, perbankan, tambang, manufaktur.
- **Positioning:** pelopor layanan izin ekspatriat **berbasis digital** (aplikasi GARIS untuk monitoring real-time).
- **Visi:** market leader layanan izin ekspatriat & manpower supply berbasis digital di Indonesia.
- **Misi:** (1) layanan terbaik sesuai kebutuhan klien, (2) proses digital sebagai nilai tambah, (3) jujur & berintegritas, (4) solusi adaptif sesuai klien.
- **Nilai:** Commitment to Service · Adaptive Solutions · Integrity.
- **Keunggulan (Why Ape Gale):** Digital Monitoring · Fast Response · Compliance Driven · Nationwide Service.
- **Angka:** **35+ kota**, **20+ tahun** pengalaman (keputusan klien; compro menulis 7+).
- **Jaringan:** Medan, Pekanbaru, Batam, Padang, Palembang, Lampung, Jakarta, Bandung, Semarang, Yogyakarta, Balikpapan, Makassar, Jayapura (peta di hal. 9).
- **Klien (hal. 8):** Affirmate, KSB, CHINT, allnex, Apple, AdaKami, unicharm, Ferbeck, Lalamove, Neo Energy, Taiheiyo Cement.
- **Organisasi:** Director Deny Yandi I.; Manager Operational, Finance Manager, Product Dev & Controller, Field Team Leader + staf.
- **Kantor (final, dikonfirmasi 08 Okt 2026):** Ascott Sudirman Jakarta, Affirmate Floor 31st Ciputra World II, Jl. Prof. Dr. Satrio Kav 11, Karet Kuningan, Setiabudi, Jakarta Selatan.
- **Kontak (compro 2026):** (021) 5092 8670 · 0811 9996 286 · apegale.admin@apegale.com.

### 4 pilar layanan (compro 2026) — referensi saja; website memakai 6 layanan (bagian 8)
1. **Conversant Expatriate** — KITAS, KITAP, Visa & Paspor, All in One Solutions, Senior KITAS, Senior Visa.
2. **Management Advisory** — advisory bisnis, pengembangan organisasi, risk & compliance.
3. **Broad Expatriate Hosting** — hosting TKA berbasis teknologi.
4. **Expatriate Formalities Services** — RPTKA, Notifikasi IMTA, KITAS, MERP, SKTT, STM, KITAP, Sponsorship Retirement Visa, KITAS Investor, Business Visa, Paspor, dokumen formalitas.

---

## 3. Audit website lama (apegale.com)

Screenshot: `screenshots/web-lama-apegale-*.png`. Rebuild statis 33 halaman sudah ada di folder induk (lihat `README.md`).

| Masalah | Dampak |
|---|---|
| Teks di section "Profil Perusahaan" bertumpuk (layout Elementor rusak) | Kesan tidak terawat di section paling penting |
| Hero slider berat & tidak jelas pesannya | Pengunjung tidak langsung tahu Apegale ngapain |
| Warna kartu layanan campur (oranye, kuning, biru) | Tidak sesuai brand maroon |
| Berita terakhir 2021 (Covid) | Kesan perusahaan tidak aktif |
| Alamat lama Zam-zam Square Condet, telp 021-22098902 | Berbeda dengan compro 2026 |
| Menu 7 level dropdown, 33 halaman, banyak halaman tipis | Navigasi berat, SEO terpecah |
| Counter "Total User Visit" | Elemen usang, tidak membangun trust |
| Versi English hanya ikon bendera, tanpa halaman | Janji fitur yang tidak ada |

Yang **dipertahankan**: logo, warna maroon, konten layanan & regulasi (Enactments), produk GARIS, foto founder.

---

## 4. Analisis referensi: letsmoveindonesia.com

Screenshot: `screenshots/ref-letsmove-*.png`. Gaya: Elementor, font Lato, biru `#3574B8` + oranye CTA `#F29616`, kartu sudut membulat, tinggi halaman ±8.600px.

Urutan homepage referensi dan keputusan untuk Apegale:

| Section referensi | Isi | Untuk Apegale |
|---|---|---|
| Topbar + header | Telp & WA di atas, mega-menu per layanan, tombol "Contact Office" | **Adopsi.** Topbar telp/WA, menu 6 item, tombol CTA "Konsultasi Gratis" |
| Hero | Foto kota blur + kartu glass, headline, CTA, badge award | **Adopsi pola**, isi: headline + CTA + badge "7+ Tahun · 35+ Kota" (Apegale tidak punya award) |
| Strip logo partner | Logo klien | **Adopsi**: 11 logo klien compro hal. 8 (lihat bagian 8) |
| Our Services | 4 kartu dengan foto tim + tombol | **Adopsi**: 6 layanan, foto tim/talent IG |
| Our Offices | Lingkaran foto kantor | **Ubah** jadi peta jaringan 35+ kota (hal. 9 compro) — lebih kuat untuk Apegale |
| About Us | Foto tim besar + 4 poin keunggulan | **Adopsi**: 4 keunggulan "Why Ape Gale" |
| Awards | 2 kartu award | **Ganti** dengan section GARIS (diferensiasi digital Apegale) |
| Contact form | Form + pilih tanggal/jam/tipe konsultasi | **Adopsi versi ringan**: nama, perusahaan, email, WA, layanan, pesan → masuk email + tombol WA |
| Reviews | Testimoni | **Adopsi** (klien setuju, konten testimoni asli dari klien) |
| FAQ | Accordion | **Adopsi** (bagus untuk SEO), isi dari konten IG "Did You Know?" |
| Latest News | 4 kartu berita | **Adopsi**, terhubung CMS |
| CTA banner | Banner konsultasi | **Adopsi** |
| Footer | Kantor, layanan populer, posting terbaru, newsletter | **Adopsi** tanpa newsletter |

Prinsip yang diambil: **struktur & alur** referensi, bukan warnanya. Identitas tetap maroon Apegale.

---

## 5. Insight Instagram @apegaleindonesia

- Bio: *Expatriate Hosting | Expatriate Formalities | Company Legalities | Airport Escort*, link ke linktr.ee/apegaleindo, 73 pengikut, aktif posting (Sep–Okt 2026).
- Highlight: Did You Know?, About us, Requirements, Service, Review, Price List.
- **Gaya visual:** gradasi maroon + putih, headline sans tebal kapital, talent internal (model berhijab) dengan pose ekspresif, aksen tanda tanya merah 3D, ikon sketsa pensil hitam-putih untuk highlight.
- **Tone:** edukatif & santai, campur Inggris–Indonesia ("POV: You're moving to Indonesia", "Istilah imigrasi yang sering bikin bingung").
- Kalimat kunci: *"Your partner for Immigration & Expatriate"* dan *"Got questions? Talk to us"*.

Implikasi: website bisa lebih hangat daripada compro yang korporat. Hero & CTA pakai bahasa IG, konten edukasi IG dipakai ulang untuk FAQ & News.

---

## 6. Arah desain yang diusulkan

**Konsep:** *Corporate-warm* — kerangka korporat compro (bidang diagonal maroon, foto gedung kota) + kehangatan IG (talent, bahasa santai).

### Warna (diambil dari compro & logo)
| Token | Hex | Pakai untuk |
|---|---|---|
| `--brand-700` | `#6B0D1D` → final `maroon-deep #5E0E17` | Footer, teks gelap aksen, hover |
| `--brand-600` | `#821427` | Gradasi |
| `--brand-500` | `#93192B` → final `maroon #8C1722` (warna asli logo) | Warna utama: tombol, heading aksen, bidang diagonal |
| `--brand-50` | `#FDF4F4` | Latar section lembut |
| `--ink` | `#1C1516` | Teks utama |
| `--muted` | `#6B5F60` | Teks sekunder |
| `--line` | `#EEE4E3` | Garis & border |
| `--wa` | `#25D366` | Tombol WhatsApp saja |

Tidak memakai oranye/kuning/biru web lama.

### Tipografi (final di design system, 08 Okt 2026)
- Heading: **Jost** 500–700 — geometris, paling dekat dengan wordmark logo.
- Body: **Source Sans 3** 400/600, 16px, line-height 1.6 — nyaman untuk teks regulasi panjang.
- (Usulan awal Montserrat + Inter diganti.)

### Elemen visual
- Bidang diagonal maroon (seperti cover & halaman compro) sebagai pembingkai hero dan header section.
- Foto: gedung kota Jakarta, kantor Ciputra World (hal. 6 compro), talent IG.
- Ikon garis merah dalam lingkaran (seperti ikon Why Ape Gale di compro).
- Kartu putih sudut 12–16px, bayangan halus.
- Peta Indonesia dengan titik kota (hal. 9).

---

## 7. Sitemap baru & template

33 halaman lama diringkas jadi **8 template**. Halaman detail diisi lewat CMS, jadi sesuai scope quotation.

```
Home
Tentang Kami        (gabungan: Salam dari Kami, Profil, Founder, Organigram → 1 halaman dengan anchor)
Layanan             (index 6 layanan + Price List)
  └ Detail Layanan  (1 template, dipakai: KITAS & KITAP, Visa & Paspor, VITAS, Multiple Business Visa,
                     Visa Kunjungan, Visa Penyatuan Keluarga, VOA, Visa Pelajar, All in One, KITAS Lansia,
                     Expatriate Hosting, Manpower Supply, Legalitas Perusahaan, Airport Escort, HR System & Consulting)
GARIS               (produk + varian Formalities / Airport / Expat + CTA Coba Gratis & Login)
Regulasi            (index Enactments)
  └ Detail Regulasi (UU Cipta Kerja, Perizinan TKA, Keimigrasian TKA, Manpower Supply, Lainnya)
News                (index)
  └ Detail Artikel
Hubungi Kami        (form + peta + WA; form "Coba Gratis GARIS" pindah ke halaman GARIS)
```

Daftar template yang didesain: **Home, Tentang Kami, Layanan (index), Detail Layanan, GARIS, Listing (News/Regulasi), Detail Artikel/Regulasi, Hubungi Kami** + komponen global (header, mega-menu, footer, tombol WA melayang, CTA banner). Masing-masing versi desktop (1440) & mobile (390).

### Struktur homepage
1. Topbar (telp, WA, email) + header + toggle ID|EN + CTA "Konsultasi Gratis"
2. Hero: diagonal maroon + foto kota; headline mis. *"Your Partner for Immigration & Expatriate"*, subteks, 2 CTA (Konsultasi via WhatsApp / Lihat Layanan), badge 20+ tahun · 35+ kota
3. Strip logo klien
4. 6 layanan (grid kartu + link ke detail)
5. Why Ape Gale: 4 keunggulan
6. GARIS: mockup aplikasi + fitur monitoring real-time + tombol "Segera Hadir" & tanya via WA
7. Jaringan nasional: peta 35+ kota
8. Tentang singkat + sambutan Founder
9. Testimoni klien
10. FAQ (accordion)
11. News terbaru (3–4 kartu CMS)
12. CTA banner + form singkat
13. Footer: alamat, kontak, layanan, regulasi, sosial media

---

## 8. Keputusan klien (08 Okt 2026)

| # | Topik | Keputusan | Dampak ke desain |
|---|---|---|---|
| 1 | Alamat | **Ciputra World II, Jakarta Selatan** (compro 2026) | Dipakai di topbar, Hubungi Kami, peta, footer. Alamat Condet dihapus. Saran: bio IG "Jakarta Timur" diperbarui |
| 2 | Telepon | **(021) 5092 8670 · 0811 9996 286** (compro 2026), email apegale.admin@apegale.com | Nomor lama 021-22098902 tidak dipakai. Tombol WA ke 0811 9996 286 |
| 3 | Layanan | **6 layanan web lama** (bukan 4 pilar compro) | Lihat daftar di bawah; homepage pakai grid 6 kartu |
| 4 | Pengalaman | **20+ tahun** | Badge hero: "20+ Tahun Pengalaman · 35+ Kota" |
| 5 | Bahasa | **Indonesia + English**, tanpa tambahan biaya di quotation | Toggle ID/EN ala nexora-technology.id (spesifikasi di bawah); CMS punya field ID & EN |
| 6 | Logo klien | **Hanya 11 klien dari compro 2026 hal. 8** (keputusan 08 Okt 2026). apegale.com tidak punya logo klien; logo di affirmate.co.id adalah klien Affirmate dan **tidak dipakai** | Strip logo 11 klien di homepage, tidak ada duplikat |
| 7 | GARIS | Login & Coba Gratis **sudah tidak aktif**, tapi **tetap ditampilkan** (akan diaktifkan lagi oleh KaryaLo di project berikutnya) | Tombol jadi "Segera Hadir" (non-aktif) + "Tanya via WhatsApp"; tidak ada link mati. URL tombol diisi di CMS agar tinggal diaktifkan |
| 8 | Testimoni & Price List | **Ditampilkan** | Section Testimoni di homepage; Price List sebagai section di halaman Layanan + tabel harga di tiap Detail Layanan (dikelola CMS) |

### 6 layanan (struktur menu "Layanan")
1. **Broad Expatriate Hosting**
2. **Expatriate Formalities** → KITAS & KITAP · Visa & Paspor (VITAS, Multiple Business Visa, Visa Kunjungan & VKSB 211, Visa Penyatuan Keluarga C317, Visa on Arrival, Visa Pelajar) · All in One Solutions · KITAS Lansia
3. **Manpower Supply**
4. **Legalitas Perusahaan**
5. **Airport Escort**
6. **HR System & Consulting**

Semua memakai template Detail Layanan yang sama. Konten "Management Advisory" dari compro bisa masuk ke HR System & Consulting.

### Spesifikasi toggle bahasa (mengikuti nexora-technology.id)
- Bentuk: pill/segmented `ID | EN` di kanan header (`.language-toggle`), wadah putih radius penuh, padding 4px, jarak 4px.
- Tombol 36×30px, teks 12px bold. Aktif: latar warna brand muda + teks warna brand; non-aktif: teks abu gelap. Transisi warna 0,2 detik.
- Klik → teks seluruh halaman langsung berganti tanpa reload; pilihan disimpan di `localStorage`, default **ID**.
- Untuk Apegale warnanya: aktif `--brand-50` + teks `--brand-500`.
- Tambahan dari kami (nexora tidak melakukannya): atribut `<html lang>` ikut berubah, dan konten EN tetap bisa dirayapi Google (SEO dasar). Tampilan & perilaku tetap sama.
- Di mobile, toggle tampil di header di samping tombol menu.

### Catatan logo klien
- Daftar final (11, tanpa duplikat): **Affirmate, KSB, AdaKami, unicharm, CHINT, Ferbeck, allnex, Lalamove, Apple, Neo Energy, Taiheiyo Cement**.
- Sudah dicek: website apegale.com (halaman + 201 file media library) dan compro 2021 (ID & EN) **tidak memuat logo klien**.
- affirmate.co.id punya 51 logo klien Affirmate → bukan untuk website Apegale; file disimpan di `Compro/Affirmate/_riset/logo-client-affirmate.co.id/` untuk project Affirmate.
- Yang tersedia sebagai gambar di PDF: Affirmate, Ferbeck, CHINT, allnex, Neo Energy (di `aset-compro/logo-klien/`). Enam lainnya tertanam sebagai vektor → pakai SVG resmi brand, ditampilkan monokrom/abu agar seragam.
- Foto handshake di hal. 8 compro bertanda air **Shutterstock** → **jangan dipakai** (perlu lisensi).

### Konten yang masih perlu dari klien
- **Testimoni asli**: nama, jabatan, perusahaan, isi testimoni (min. 3). Tidak akan kami karang.
- **Price List**: daftar harga terbaru (versi highlight IG "Price List") per layanan.
- **Teks English**: compro sudah English; halaman lain diterjemahkan KaryaLo, mohon review dari klien.

### Aset yang perlu diminta
- Logo vektor (SVG/AI) Apegale & GARIS
- Foto resolusi tinggi: kantor, tim, founder, talent IG, foto kegiatan
- Teks final Salam dari Kami & profil Founder
- Dokumen legalitas (hal. 7 compro "Documents" kosong di PDF) bila ingin ditampilkan
- Akses hosting & domain (deploy ke hosting klien)

---

## 9. Design system

Style guide + moodboard: https://claude.ai/artifact/AhQMMNhCUoWoz5Xk1612J8 (salinan file di `design-system/`).

## 10. Langkah berikutnya

| Hari | Kegiatan |
|---|---|
| 1 | Minta testimoni, price list, aset (bagian 8); moodboard + style guide (warna, font, komponen, toggle bahasa) |
| 2 | Wireframe 8 template (desktop + mobile) |
| 3–4 | UI hi-fi Home + Layanan + Detail Layanan, lalu template lainnya |
| 5 | Presentasi ke klien → revisi 1 |
| Minggu 2 | Revisi 2 (bila ada) paralel dengan development + CMS |

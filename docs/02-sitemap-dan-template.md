# 02 — Sitemap, template, dan redirect

## Routes
Indonesian tanpa prefix, English di bawah `/en`. Segmen halaman statis dilokalkan; slug isi (layanan, regulasi, berita) **sama** di dua bahasa. Toggle bahasa memetakan rute lewat tabel ini.

| Template | ID | EN | Sumber data |
|---|---|---|---|
| Home | `/` | `/en` | global `home` + koleksi |
| Tentang Kami | `/tentang-kami` | `/en/about` | global `about` |
| Layanan (index + Price List) | `/layanan` | `/en/services` | `services` (parent kosong) + `priceItems` |
| Detail Layanan | `/layanan/[slug]` | `/en/services/[slug]` | `services` |
| GARIS | `/garis` | `/en/garis` | global `garis` |
| Regulasi (list) | `/regulasi` | `/en/regulations` | `regulations` (filter kategori) |
| Detail Regulasi | `/regulasi/[slug]` | `/en/regulations/[slug]` | `regulations` |
| News (list) | `/news` | `/en/news` | `posts` |
| Detail Artikel | `/news/[slug]` | `/en/news/[slug]` | `posts` |
| Hubungi Kami | `/hubungi-kami` | `/en/contact` | global `site` + koleksi `inquiries` |
| 404 | — | — | dwibahasa, link ke Layanan & WhatsApp |

Layout global di semua halaman: **Header** (topbar + nav + toggle bahasa + CTA "Konsultasi Gratis") · konten · **CTA banner** (kecuali Hubungi Kami) · **Footer** · **WhatsAppFloat**.

## Menu utama
Home · Tentang Kami ▾ (Salam dari Kami, Profil Perusahaan, Founder, Organigram — anchor di satu halaman) · Layanan ▾ (6 layanan; Expatriate Formalities punya sub-menu: KITAS & KITAP, Visa & Paspor, All in One Solutions, KITAS Lansia) · GARIS · Regulasi · News · Hubungi Kami.
Menu diambil dari CMS (`services` dengan `showInMenu`), bukan di-hardcode.

## Susunan section per template

### Home
1. Hero — eyebrow "Conversant Expatriate Services", headline, lead, CTA (Konsultasi Gratis → WhatsApp/form, Lihat Layanan), StatBadge 20+ / 35+, foto. (`Hero`)
2. ClientStrip — 11 logo. (`ClientStrip`)
3. Layanan — SectionHeading + grid 6 ServiceCard. (`ServiceCard`)
4. Why Ape Gale — 4 keunggulan (Digital Monitoring, Fast Response, Compliance Driven, Nationwide Service) di `surface-soft`, ikon dalam lingkaran.
5. GARIS — mockup dashboard + 3 fitur + tombol "Segera Hadir" + WhatsApp.
6. Jaringan — peta Indonesia dengan titik 13 kota dari compro + teks "35+ kota". Peta: SVG Indonesia sederhana (buat dari data publik, mis. Natural Earth, atau gambar dari CMS).
7. Tentang singkat + sambutan Founder (foto founder, kutipan pendek dari "Salam dari Kami").
8. Testimoni — tampil hanya jika ada ≥1 testimoni ber-`published`. (`Testimonial`)
9. FAQ — 5–6 item dari koleksi `faqs` (featured). (`FAQ`)
10. News terbaru — 3 kartu (posts + regulations terbaru). (`NewsCard`)
11. CTA banner + form singkat (`ContactForm` versi ringkas: nama, WA, layanan, pesan).

### Tentang Kami
Header halaman diagonal (H1) → Salam dari Kami (founder) → Profil, Visi & Misi → Nilai (Commitment to Service, Adaptive Solutions, Integrity) → Keunggulan → Organigram (dari CMS: nama + jabatan, tanpa foto bila tidak ada) → Jaringan → CTA.

### Layanan (index)
Header halaman → grid 6 layanan → **Price List** ringkas (`PriceTable`, gabungan `priceItems` yang `featured`) dengan catatan "harga belum termasuk PNBP" → FAQ kategori layanan → CTA.

### Detail Layanan
Breadcrumb → header (judul, ringkasan, CTA WhatsApp dengan pesan otomatis "Halo Ape Gale, saya ingin bertanya tentang <layanan>") → isi rich text → sub-layanan (kartu ke anak-anaknya, jika ada) → persyaratan/dokumen (list, opsional) → tabel harga layanan ini (jika ada) → FAQ terkait → layanan lain → CTA.

### GARIS
Hero produk (logo GARIS, deskripsi "Gale Resources Information System") → 3 varian: GARIS Formalities, GARIS Airport Escort, GARIS Expat (monitoring & reminder) → screenshot dashboard & mobile → tombol Login/Coba Gratis non-aktif ("Segera Hadir") + "Tanya via WhatsApp". Saat `garis.enabled = true` di CMS, tombol aktif ke URL yang tersimpan.

### Regulasi / News (list)
Header → filter kategori (chip) → grid NewsCard, 9 per halaman, pagination. Regulasi kategori: Undang-undang Cipta Kerja, Ketentuan Perizinan TKA, Ketentuan Keimigrasian TKA, Ketentuan Manpower Supply, Ketentuan Lainnya.

### Detail Regulasi / Artikel
Breadcrumb → judul, tanggal, kategori → isi → lampiran PDF (tombol "Unduh PDF", untuk regulasi) → artikel terkait → CTA.

### Hubungi Kami
Header → 2 kolom: info kontak (alamat, telepon, WA, email, jam kerja bila ada) + `ContactForm` lengkap → peta (link "Buka di Google Maps", bukan iframe berat; boleh gambar statis) → FAQ singkat.

## Redirect 301 dari URL lama
URL lama WordPress berbentuk `/<slug>/`. Cek ulang daftar di `https://apegale.com/sitemap_index.xml` sebelum go-live. Implementasi di `next.config` `redirects()`.

| Lama | Baru |
|---|---|
| `/salam-dari-kami/` | `/tentang-kami#salam` |
| `/profil-perusahaan/` | `/tentang-kami#profil` |
| `/founder/` | `/tentang-kami#founder` |
| `/organigram/` | `/tentang-kami#organigram` |
| `/expatriate-hosting/` | `/layanan/broad-expatriate-hosting` |
| `/expatriate-formalities/` | `/layanan/expatriate-formalities` |
| `/layanan-kitas-kitap/` | `/layanan/kitas-kitap` |
| `/layanan-visa-paspor/` | `/layanan/visa-paspor` |
| `/vitas/` `/multiple-business-visa/` `/visa-kunjungan/` `/visa-tinggal-terbatas-penyatuan-keluarga/` `/visa-on-arrival/` `/visa-pelajar/` | `/layanan/<slug yang sama>` |
| `/all-in-one-solutions/` `/kitas-lansia/` | `/layanan/<slug yang sama>` |
| `/manpower-supply/` `/legalitas-perusahaan/` `/airport-escort/` `/hr-system-consulting/` | `/layanan/<slug yang sama>` |
| `/garis-in/` `/garis-formalities-in/` `/garis-airport-in/` `/garis-expat-in/` | `/garis` |
| `/coba-gratis-aplikasi-garis/` | `/garis#coba-gratis` |
| `/enactments-undang-undang-cipta-kerja/` | `/regulasi?kategori=cipta-kerja` |
| `/ketentuan-perizinan-tka/` | `/regulasi?kategori=perizinan-tka` |
| `/ketentuan-keimigrasian-untuk-tka/` | `/regulasi?kategori=keimigrasian-tka` |
| `/enactments-ketentuan-manpower-supply/` | `/regulasi?kategori=manpower-supply` |
| `/enactments-ketentuan-ketentuan-lainnya/` | `/regulasi?kategori=lainnya` |
| `/news/` | `/news` |
| `/hubungi-kami/` | `/hubungi-kami` |
| `/wp-content/uploads/:path*` (PDF regulasi) | file yang sudah dipindah ke media CMS (buat map saat migrasi) |

## Sumber isi halaman lama (`legacy/`)
| Halaman baru | File lama |
|---|---|
| Tentang Kami | `salam-dari-kami.html`, `profil-perusahaan.html`, `founder.html`, `organigram.html` |
| Detail Layanan | `expatriate-hosting.html`, `expatriate-formalities.html`, `layanan-kitas-kitap.html`, `layanan-visa-paspor.html`, `vitas.html`, `multiple-business-visa.html`, `visa-kunjungan.html`, `visa-tinggal-terbatas-penyatuan-keluarga.html`, `visa-on-arrival.html`, `visa-pelajar.html`, `all-in-one-solutions.html`, `kitas-lansia.html`, `manpower-supply.html`, `legalitas-perusahaan.html`, `airport-escort.html`, `hr-system-consulting.html` |
| GARIS | `garis-in.html`, `garis-formalities-in.html`, `garis-airport-in.html`, `garis-expat-in.html`, `coba-gratis-aplikasi-garis.html` |
| Regulasi | `enactments-*.html`, `ketentuan-*.html` (daftar regulasi + link PDF ke apegale.com/wp-content/uploads — unduh dan unggah ulang ke CMS) |

Berita lama (2021, Covid) **tidak dimigrasi**; News dimulai dari regulasi terbaru (mis. Permenkumham 22/2023).

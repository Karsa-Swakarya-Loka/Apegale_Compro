# 01 — Brief

## Proyek
Redesign website company profile **apegale.com** untuk PT Ape Gale Indonesia (bagian dari Affirmate Group). Dikerjakan oleh KaryaLo (PT Karsa Swakarya Loka), PIC: Lucky Ramdani Reza.
Dokumen komersial: Surat Penawaran QTN-WEB-APG-2026-003, Invoice DP INV-WEB-APG-2026-001 (08 Okt 2026).

## Scope (sesuai quotation)
| Komponen | Isi |
|---|---|
| UI/UX multi-page | Home, Tentang Kami, Layanan + Detail Layanan, GARIS, Regulasi, News, Hubungi Kami |
| Development responsive | Desktop + mobile, menu dropdown, CTA WhatsApp |
| CMS | Admin bisa ubah teks, gambar, layanan, regulasi, berita, testimoni, harga, FAQ, logo klien |
| SEO dasar, QA, go-live | Metadata, sitemap, hreflang, redirect URL lama, deploy ke hosting klien |
| Waktu | 2 minggu; revisi desain maks. 2 kali |

**Di luar scope:** aplikasi GARIS (login/daftar, akan dikerjakan di project berikutnya), ERP, blog multi-penulis, pembayaran online.

## Keputusan klien (08 Okt 2026)
1. Alamat: Ciputra World II, Jakarta Selatan (bukan Condet).
2. Kontak: (021) 5092 8670 · WA 0811 9996 286 · apegale.admin@apegale.com.
3. Layanan: 6 layanan web lama (bukan 4 pilar compro).
4. Pengalaman: 20+ tahun. Jaringan: 35+ kota.
5. Bahasa: Indonesia + English, toggle seperti nexora-technology.id. Tidak menambah biaya quotation.
6. Logo klien: hanya 11 dari compro 2026 hal. 8.
7. GARIS: tetap ditampilkan, Login/Coba Gratis non-aktif ("Segera Hadir").
8. Testimoni & Price List: ditampilkan (isi asli dari klien).

## Arah desain
Korporat yang hangat: bidang diagonal maroon + foto gedung kota (compro 2026), nada santai-edukatif (Instagram), struktur halaman ala letsmoveindonesia.com. Semua detail ada di `design/`.

## Sumber konten
- `content/seed/*.json` — konten yang sudah final (ID + EN).
- Halaman statis lama di `legacy/*.html` (33 halaman hasil rebuild apegale.com) — **sumber isi Detail Layanan, Tentang Kami, dan Regulasi**. Ambil teksnya (bahasa Indonesia), rapikan, lalu terjemahkan ke English. Jangan bawa layout/CSS lamanya.
- Company Profile 2026 (`legacy/company-profile-2026.pdf`) — visi, misi, nilai, keunggulan, jaringan.

## Yang masih ditunggu dari klien (render dengan placeholder bertanda / sembunyikan)
- Testimoni asli (min. 3), daftar harga terbaru, foto resolusi tinggi (kantor, tim, founder), logo SVG Apegale & GARIS, SVG 6 logo klien, review terjemahan EN, akses hosting/domain, konfirmasi hosting mendukung Node.js + Postgres.

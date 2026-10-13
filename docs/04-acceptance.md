# 04 — Definition of done

## Visual
- [ ] Setiap halaman cocok dengan preview di `design/components/*` pada lebar 1440px dan 390px (warna, font, radius, spasi, bidang diagonal).
- [ ] Tidak ada nilai warna/spasi/radius yang di-hardcode di luar `tokens.css` (cek: `grep -rE "#[0-9a-fA-F]{3,6}" src --include=*.css --include=*.tsx` hanya mengenai `tokens.css`).
- [ ] Tidak ada scroll horizontal di 360–1920px. Tabel harga menggulir di wadahnya sendiri.
- [ ] Logo header 40px desktop / 32px mobile; favicon dari `apegale-mark.png`.

## Konten & bahasa
- [ ] Semua teks UI dan konten tersedia dalam ID dan EN; tidak ada teks hard-coded satu bahasa di komponen (pakai dictionary untuk label UI).
- [ ] Toggle ID/EN pindah ke halaman yang setara tanpa full reload, mengingat pilihan, mengubah `<html lang>`.
- [ ] Fakta resmi (20+ tahun, 35+ kota, kontak, alamat Ciputra World II) tampil sama di header, footer, Hubungi Kami.
- [ ] Testimoni & harga tidak dikarang; section tersembunyi bila kosong.
- [ ] Tombol GARIS non-aktif ("Segera Hadir") dan bisa diaktifkan dari CMS tanpa deploy ulang.
- [ ] Hanya 11 logo klien dari compro.

## CMS
- [ ] Admin bisa mengubah: hero, statistik, kontak, layanan (+harga), testimoni, logo klien, FAQ, berita, regulasi (+PDF), organigram, GARIS.
- [ ] Draft/publish berfungsi; preview draft untuk admin.
- [ ] `seed` mengisi seluruh `content/seed/*.json` ke dua bahasa, bisa diulang tanpa duplikat.
- [ ] Form Hubungi Kami tersimpan di `inquiries` dan mengirim email; error & sukses tampil sesuai `ContactForm`.

## SEO & performa
- [ ] `generateMetadata` per halaman (title, description, OG image) dari CMS, kedua bahasa.
- [ ] `hreflang` id/en + `x-default`, canonical, `sitemap.xml`, `robots.txt`.
- [ ] Schema.org: `Organization` (Home), `Service` (Detail Layanan), `FAQPage` (FAQ), `Article` (News/Regulasi), `BreadcrumbList`.
- [ ] Semua redirect 301 di `docs/02` aktif.
- [ ] Lighthouse mobile ≥ 90 untuk Performance, Accessibility, Best Practices, SEO di Home, Layanan, Detail Layanan.
- [ ] Gambar lewat `next/image` (webp/avif, ukuran responsif), font via `next/font`.

## Aksesibilitas
- [ ] WCAG 2.2 AA: kontras (sudah dijamin token), fokus terlihat, navigasi keyboard termasuk dropdown & menu mobile, `aria-current` di menu, label form, `prefers-reduced-motion`.

## Deploy
- [ ] `.env.example` lengkap (`DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL`, `SMTP_*`).
- [ ] Panduan deploy singkat di `README.md` untuk hosting Node.js klien (build, start, migrasi DB, folder media persisten, backup).

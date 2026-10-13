# Status langkah 8 — 09 Oktober 2026

**Selesai. Hubungi Kami + form singkat di Home berfungsi end-to-end. Langkah 9 (SEO & redirect) boleh dimulai.**

## Halaman Hubungi Kami (`/hubungi-kami`, `/en/contact`)

- Info kontak (alamat + tautan Google Maps tanpa iframe, telepon, WhatsApp, email, Instagram), form lengkap, FAQ umum. Tanpa CTA banner (docs/02).
- Form singkat di Home (nama, WhatsApp, layanan, pesan) memakai komponen dan server action yang sama.

## Alur form (`src/app/actions/inquiry.ts`)

honeypot → validasi → cek duplikat (WhatsApp + pesan yang sama dalam 10 menit) → rate limit (5 kiriman tersimpan per IP per 10 menit) → simpan inquiry → kirim email notifikasi ke email di global `site`.

- Inquiry **selalu disimpan dulu**; `emailStatus` = `sent` atau `failed` (termasuk `failed` bila SMTP belum diisi) — keputusan #19.
- Wajib: nama, WhatsApp, layanan, pesan; email wajib hanya di form lengkap. Pesan error per field (ID/EN) terhubung lewat `aria-describedby`, fokus pindah ke field pertama yang salah, status diumumkan lewat live region.
- Bekerja **tanpa JavaScript** (form POST biasa).
- Variabel SMTP: `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_ADDRESS` (lihat `.env.example`).

## Bug yang ditemukan & diperbaiki

1. **Server macet 100% CPU setelah kirim form tanpa JavaScript.** Penyebab: action di-`bind(locale)` di setiap render, sehingga React terus mengulang pemulihan state form di server. Locale kini dikirim lewat hidden field dan action dipakai langsung.
2. Rate limit menghitung kiriman yang gagal validasi, sehingga pengunjung yang salah ketik bisa terkunci. Sekarang hanya kiriman yang akan disimpan yang dihitung.
3. Kunci duplikat tidak memangkas spasi → diperbaiki.

## Hasil pemeriksaan

- Uji langkah 8 **21/21** dengan SMTP penangkap lokal: tampilan, error kosong & format, fokus, simpan + email terkirim, kiriman ganda tidak menggandakan data, honeypot, pesan EN, form Home di mobile 390px, tanpa JS, rate limit. Tambahan: kiriman tanpa JS dari `/en/contact` tersimpan dengan locale `en`, server tetap responsif.
- Unit test **19/19** (`npm test`), typecheck, lint, build lulus.

## Catatan deploy

Rate limit membaca IP dari `x-forwarded-for`; di produksi aplikasi **harus** di belakang reverse proxy (Nginx/Caddy) yang menimpa header tersebut. Limiter dan cek duplikat ada di memori, jadi reset saat server restart — cukup untuk satu proses Node.

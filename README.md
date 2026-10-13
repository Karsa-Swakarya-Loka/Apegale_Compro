# apegale.com — workspace untuk Codex

Folder ini adalah paket handoff dari riset & design system (Claude) ke eksekusi kode (Codex).

## Isi
- `AGENTS.md` — instruksi utama yang otomatis dibaca Codex.
- `docs/` — brief, sitemap & template, skema CMS Payload, definition of done, open questions, riset.
- `design/` — design system lokal: `tokens.json`/`tokens.css`, `components.css`, 17 folder komponen (15 README dan 17 preview), aset logo/klien/foto. Buka `design/index.html` di browser.
- `content/seed/` — konten ID + EN siap di-seed ke CMS.
- `reference/` — screenshot riset & moodboard (bukan untuk produksi).
- Halaman lama ada di `legacy/*.html` (+ `legacy/img/`, `legacy/company-profile-2026.pdf`) sebagai sumber isi.

## Cara pakai di Codex
**Prompt lengkap per langkah ada di `docs/CODEX-PROMPTS.md`** (langkah 0–10 + prompt bantu). Ringkasnya:
1. Buka folder `web/` ini sebagai workspace di Codex (CLI: `cd web && codex`, atau pilih folder ini di Codex app/IDE).
2. Prompt pertama:
   > Pakai prompt langkah 0 di docs/CODEX-PROMPTS.md (rencana dulu, belum menulis kode).
3. Lanjutkan per langkah: "Lanjut langkah 2 (layout shell)", dst. Setelah tiap langkah minta: "Jalankan build, lint, typecheck dan bandingkan dengan preview di design/components."
4. Langkah terakhir: "Cek semua poin docs/04-acceptance.md dan laporkan yang belum lolos."

## Kalau design berubah
Ubah di design system online (link di `design/README.md`) atau minta Claude, lalu salin ulang `tokens.json`, `tokens.css`, `components.css`, dan preview yang berubah ke `design/`.

## Setup CMS — langkah 1

Status per langkah ada di `docs/STEP-1-STATUS.md` … `docs/STEP-10-STATUS.md`. **Per 09 Okt 2026 langkah 1–10 selesai**: semua halaman publik ID/EN, CMS, form, SEO dan redirect. Pertanyaan yang menunggu klien: `docs/OPEN-QUESTIONS.md`. Panduan produksi: bagian **Deploy produksi** di bawah.

### Instalasi dan konfigurasi

Jalankan dari web/ dengan Node >=22.19.0. Versi langsung dipin dalam package.json; setelah akses npm tersedia jalankan npm install, periksa kompatibilitas hasil instalasi dan commit package-lock.json yang dihasilkan. Selanjutnya gunakan npm ci. Jangan membuat lockfile manual.

Salin .env.example ke .env jika belum ada dan isi PAYLOAD_SECRET acak minimal 32 karakter. Pada sesi setup sudah dibuat .env lokal yang diabaikan Git, berisi SQLite dan secret acak; file yang sudah ada tidak ditimpa. Tidak ada akun admin atau kredensial default dalam seed.

- Produksi/default contoh: DATABASE_ADAPTER=postgres dan DATABASE_URI koneksi PostgreSQL khusus aplikasi.
- Dev lokal: DATABASE_ADAPTER=sqlite dan DATABASE_URI=file:./.data/apegale.db. Konfigurasi adapter terpusat di src/lib/database.ts.
- Upload berada di MEDIA_DIR (default media/) di luar public/. Simpan direktori ini sebagai volume persisten dan backup bersama database.
- SMTP_* hanya diisi ketika penyedia email siap; pengiriman form dibuat pada langkah 8. Seed tidak mengirim email.

### Migrasi dan pemeriksaan sebelum langkah 2

Pada database dev/QA baru, jalankan berurutan:

~~~sh
npm install
npm run generate
npm run migrate:create -- initial_cms
npm run migrate
npm run seed
npm run seed
npm run verify:cms
npm run build
npm run lint
npm run typecheck
~~~

Periksa SQL hasil migrate:create sebelum migrate. Migrasi PostgreSQL dan SQLite dipisahkan dalam src/migrations/{postgres,sqlite}; db push dimatikan. Gunakan npm run migrate:status untuk melihat status. Jangan menjalankan verify:cms pada database produksi: script mengharapkan fixture awal dan melakukan seed serta percobaan operasi yang seharusnya ditolak.

Untuk admin pertama, isi ADMIN_EMAIL dan ADMIN_PASSWORD (minimal 12 karakter), jalankan npm run setup:admin, lalu hapus ADMIN_PASSWORD dari environment. Script menolak jika sudah ada pengguna. Setelah npm run dev, buka /admin; role editor tidak dapat mengubah site/users atau membaca inquiries. Bahasa admin default Indonesia. REST koleksi publik hanya membaca published; globals dibaca server secara eksplisit dengan draft:false dan API langsung dibatasi ke staf agar draft global tidak bocor. Draft preview: tombol **Preview** di admin (layanan, regulasi, news, Home, Tentang Kami, GARIS) membuka `/preview?path=…`, yang hanya berlaku untuk pengguna CMS yang sedang login; bar hitam di atas halaman menandai mode pratinjau dan menyediakan tombol keluar.

### Seed dan pengujian

Seed mengimpor delapan JSON sumber, 16 layanan (draft, body kosong), 11 klien, 5 FAQ, 9 media yang direferensikan dan lima globals dalam ID/EN. Organigram resmi published; Deny Yandi Imran seragam. Tidak membuat testimoni, harga, berita, regulasi atau pengguna fiktif. Payload localization menyimpan satu dokumen dengan field per locale; jumlah per locale bukan jumlah dokumen fisik ganda.

Upsert memakai slug layanan, name klien, dan seedKey FAQ/media. Pass kedua menghubungkan parent layanan. ID array nonlocalized dipertahankan pada penulisan EN. Rerun biasa mempertahankan konten CMS yang sudah ada, mengisi locale yang penulisannya terputus dan melengkapi relasi parent kosong. Untuk menyinkronkan ulang field seed yang sengaja diubah, gunakan SEED_OVERWRITE=true secara eksplisit pada database yang tepat, lalu kembalikan false. Opsi tersebut menimpa field yang dikelola seed, termasuk status/review; body hasil migrasi tidak dihapus oleh seed langkah 1. Jangan mengubah urutan FAQ dalam manifest tanpa mempertahankan pasangan seedKey-nya.

- npm run seed:report: jumlah dokumen nyata per koleksi dan locale setelah database tersedia.
- npm test: uji logika seed/akses/schema tanpa dependensi eksternal. Alternatif langsung bila shell npm bermasalah: node --experimental-strip-types --test tests/seed.test.ts tests/schema.test.ts.
- npm run verify:cms: uji integrasi Payload/database, seed dua kali, relasi, locale, draft publik, role editor, dan validasi consent. Lulus di SQLite dan PostgreSQL 16 (09 Okt 2026).

Referensi: [instalasi Payload](https://payloadcms.com/docs/getting-started/installation), [migrasi](https://payloadcms.com/docs/database/migrations), [adapter SQLite](https://payloadcms.com/docs/database/sqlite).

## Deploy produksi (hosting Node.js)

Kebutuhan: Node.js ≥ 22.19, PostgreSQL 14+ (diuji 16), reverse proxy HTTPS (Nginx/Caddy), ±1 GB RAM, folder persisten untuk upload. Tanpa PostgreSQL bisa memakai SQLite (`DATABASE_ADAPTER=sqlite`) asalkan file database berada di disk persisten dan hanya ada satu proses Node.

### 1. Environment (`.env` di server, jangan di-commit)

| Variabel | Isi |
|---|---|
| `DATABASE_ADAPTER` / `DATABASE_URI` | `postgres` + `postgresql://user:pass@host:5432/apegale` (user khusus aplikasi) |
| `PAYLOAD_SECRET` | acak ≥ 32 karakter (`openssl rand -hex 32`); jangan pernah diganti setelah live (sesi admin putus) |
| `NEXT_PUBLIC_SITE_URL` | domain final tanpa garis miring akhir, mis. `https://apegale.com`. **Dibaca saat build** — ubah = build ulang |
| `MEDIA_DIR` | folder upload persisten di luar folder rilis, mis. `/var/apegale/media` |
| `SMTP_*` | akun email pengirim notifikasi form (lihat `.env.example`); kosong = inquiry tetap tersimpan, `emailStatus=failed` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | hanya untuk `npm run setup:admin` sekali, lalu hapus `ADMIN_PASSWORD` |

### 2. Rilis pertama

~~~sh
npm ci
npm run migrate            # src/migrations/postgres (atau sqlite)
npm run seed               # isi awal dari content/seed — aman diulang
npm run content:services   # isi 16 layanan (7 publish, 9 draft)
npm run content:about      # sambutan & profil Tentang Kami
npm run content:client-logos
npm run content:regulations  # unduh 44 PDF lama → media (perlu akses internet ke apegale.com lama, semua draft)
npm run setup:admin        # akun admin pertama oleh pemilik
npm run build
npm run start -- -p 3000   # jalankan di bawah pm2/systemd agar restart otomatis
~~~

**Penting:** jalankan `npm run setup:admin` **sebelum** server bisa diakses publik. Selama database belum punya pengguna, Payload menampilkan halaman "buat admin pertama" di `/admin` untuk siapa saja yang membukanya.

Contoh pm2: `pm2 start npm --name apegale -- run start -- -p 3000 && pm2 save`. Jalankan **satu** proses (rate limit form dan cek duplikat ada di memori).

Skrip `content:*` hanya untuk rilis pertama: setelah klien mulai mengedit di CMS, jangan dijalankan lagi (akan menimpa isi yang sudah diedit). Unduh PDF lama **sebelum** domain dialihkan ke server baru.

### 3. Reverse proxy

- Teruskan ke `127.0.0.1:3000`, set `Host`, `X-Forwarded-Proto`, dan **timpa** `X-Forwarded-For` dengan IP klien (dipakai rate limit form).
- `client_max_body_size 20m` (upload PDF/gambar di admin).
- Paksa HTTPS; boleh cache `/_next/static/*` setahun (nama file ber-hash).

Contoh Nginx:

~~~nginx
location / {
  proxy_pass http://127.0.0.1:3000;
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-Proto $scheme;
  proxy_set_header X-Forwarded-For $remote_addr;
  client_max_body_size 20m;
}
~~~

### 4. Rilis berikutnya

~~~sh
git pull && npm ci
npm run migrate      # hanya bila ada file baru di src/migrations/
npm run build && pm2 restart apegale
~~~

Perubahan schema CMS: `npm run migrate:create -- nama_perubahan` di lokal (terhadap Postgres), periksa SQL, commit, lalu `npm run migrate` di server.

### 5. Backup

- Database harian: `pg_dump -Fc apegale > apegale-$(date +%F).dump` (simpan ≥ 14 hari, salin ke luar server).
- Folder `MEDIA_DIR` harian (rsync/rclone) — database tanpa folder media = gambar & PDF hilang.
- Uji pulihkan minimal sekali: `pg_restore -d apegale_test file.dump` + salin media.

### 6. Setelah go-live

1. `npm run check:redirects -- https://apegale.com` → semua URL lama harus 301 (214 kasus).
2. Buka `/sitemap.xml` dan `/robots.txt`; daftarkan sitemap di Google Search Console & Bing Webmaster.
3. Kirim satu pesan uji dari `/hubungi-kami` → cek email masuk dan `emailStatus=sent` di admin.
4. Cek ulang PageSpeed Insights (mobile) untuk Home, Layanan, dan satu detail layanan.

## Deploy ke Vercel

Vercel serverless: tanpa disk permanen, jadi database harus Postgres ter-host dan upload media ke Vercel Blob.

1. **Database**: Vercel → Storage → Create → Neon (Postgres). Salin connection string (pooled).
2. **Blob**: Vercel → Storage → Create → Blob, hubungkan ke project (otomatis menambah `BLOB_READ_WRITE_TOKEN`).
3. **Environment variables** (Production + Preview): `PAYLOAD_SECRET` (acak ≥32), `DATABASE_ADAPTER=postgres`, `DATABASE_URI` (dari Neon), `NEXT_PUBLIC_SITE_URL` (URL Vercel/domain final), `BLOB_READ_WRITE_TOKEN`, SMTP_* bila form harus mengirim email.
4. **Isi database sekali dari laptop** sebelum deploy pertama (build membaca CMS, jadi tabel harus ada). Set env yang sama di terminal (`DATABASE_ADAPTER=postgres`, `DATABASE_URI`, `PAYLOAD_SECRET`, `BLOB_READ_WRITE_TOKEN`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`), lalu jalankan urutan "Rilis pertama" di atas dari `npm run migrate` sampai `npm run setup:admin` (tanpa build/start). Media seed ikut terunggah ke Blob.
5. Redeploy di Vercel. `setup:admin` harus sudah jalan sebelum situs publik (tanpa user, `/admin` membuka form admin pertama untuk siapa saja).

Catatan serverless: rate limit form ada di memori per instance, jadi di Vercel lebih longgar daripada di satu proses Node.

Skema berubah → `npm run migrate:create` (kedua adapter), commit, lalu jalankan `npm run migrate` ke database Neon sebelum push.

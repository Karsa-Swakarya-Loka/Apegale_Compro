# 03 — CMS (Payload 3)

Localization: `locales: [{ code: 'id', label: 'Bahasa Indonesia' }, { code: 'en', label: 'English' }]`, `defaultLocale: 'id'`, `fallback: true`. Field bertanda **L** = `localized: true`.
Admin panel di `/admin`, bahasa admin Indonesia. Semua koleksi publik punya `_status` (draft/published) via `versions: { drafts: true }`, kecuali `inquiries`.

## Globals
### `site`
- `phone` (text) — "(021) 5092 8670"
- `whatsapp` (text, digits) — "628119996286"; `whatsappDefaultMessage` **L**
- `email` (email) — apegale.admin@apegale.com
- `address` **L** (textarea), `mapsUrl` (text)
- `stats` (array): `value` ("20+"), `label` **L** — seed: 20+ tahun pengalaman, 35+ kota
- `social` (array): `platform` (select: instagram, linkedin, youtube, facebook), `url`
- `seoDefault`: `title` **L**, `description` **L**, `ogImage` (upload)

### `home`
- `hero`: `eyebrow` **L**, `headline` **L**, `highlight` **L** (kata yang diwarnai), `lead` **L**, `image` (upload), `primaryCta` / `secondaryCta` (label **L**, href)
- `why` (array, 4): `icon` (select Lucide name), `title` **L**, `text` **L**
- `network`: `title` **L**, `text` **L**, `cities` (array: `name`, `x`, `y` posisi titik di peta 0–100)
- `founder`: `photo` (upload), `quote` **L**, `name`, `role` **L**
- `sectionsVisible` (checkbox per section) — agar admin bisa menyembunyikan Testimoni/FAQ/News

### `about`
`greeting` **L** (richText, Salam dari Kami), `profile` **L** (richText), `vision` **L**, `mission` **L** (array text), `values` (array: `title` **L**, `text` **L**), `organigram` (array: `name`, `role` **L**, `parentIndex` number opsional)

### `garis`
`enabled` (checkbox, default **false**), `loginUrl`, `trialUrl`, `intro` **L**, `variants` (array: `name`, `text` **L**, `image`), `features` (array: `title` **L**, `text` **L**). Saat `enabled=false`, tombol tampil `aria-disabled` dengan label "Segera Hadir" / "Coming Soon".

## Collections
### `services`
`title` **L** · `slug` (unik, tidak dilokalkan) · `order` (number) · `parent` (relationship → services, opsional) · `showInMenu` (checkbox) · `icon` (select Lucide) · `summary` **L** (textarea ≤160) · `body` **L** (richText) · `requirements` **L** (array text) · `priceItems` (array: `name` **L**, `note` **L**, `duration` **L**, `priceFrom` (number, IDR, kosong = "Hubungi kami"), `featured` (checkbox)) · `image` (upload) · `seo` (title **L**, description **L**)
Seed: `content/seed/services.json`.

### `testimonials`
`quote` **L** · `name` · `role` **L** · `company` · `logo` (upload, opsional) · `consent` (checkbox, wajib true untuk publish — validasi) · `order`. **Tanpa data seed** (menunggu klien).

### `clients`
`name` · `logo` (upload, SVG/PNG) · `url` (opsional) · `order`. Seed: `content/seed/clients.json` (5 ada file, 6 menunggu SVG — buat entri dengan `logo` kosong; komponen menampilkan nama sebagai teks bila logo kosong).

### `faqs`
`question` **L** · `answer` **L** (richText) · `category` (select: umum, layanan, garis) · `services` (relationship → services, hasMany) · `featured` (checkbox) · `order`. Seed: `content/seed/faqs.json`.

### `posts` (News)
`title` **L** · `slug` · `category` (select: news, panduan) · `cover` (upload) · `excerpt` **L** · `body` **L** (richText) · `publishedAt` (date) · `seo`.

### `regulations`
`title` **L** · `slug` · `category` (select: cipta-kerja, perizinan-tka, keimigrasian-tka, manpower-supply, lainnya) · `number` (text, mis. "Permenkumham No. 22 Tahun 2023") · `issuedAt` (date) · `summary` **L** · `body` **L** · `attachments` (array: `file` (upload PDF), `label` **L**).

### `media`
Upload, `alt` **L** (wajib), image sizes: thumb 400, card 800, hero 1600, og 1200×630. Terima jpg/png/webp/svg/pdf.

### `inquiries` (form Hubungi Kami)
`name`, `company`, `email`, `whatsapp`, `service` (relationship → services), `message`, `locale`, `createdAt`, `status` (select: baru, dihubungi, selesai). Create publik lewat route handler dengan validasi + honeypot + rate-limit sederhana; akses baca hanya admin. Kirim notifikasi email ke `site.email` (Payload email adapter, SMTP dari env `SMTP_*`).

### `users`
Admin auth bawaan Payload. Role: `admin`, `editor` (editor tidak bisa hapus/ubah `site` & `users`).

## Seed
Script `src/seed/index.ts` membaca `content/seed/*.json`, upsert by `slug`/`name`, mengunggah gambar dari `design/assets/**` ke `media`, dan mengisi kedua locale. Aman dijalankan berulang.

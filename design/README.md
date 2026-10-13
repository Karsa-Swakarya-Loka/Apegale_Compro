# Ape Gale Indonesia — Brand book & design system

File: `tokens.json` (sumber nilai) → `tokens.css` (hasil generate, jangan diedit manual) · `components.css` (kelas `ag-*`) · `components/<Nama>/preview.html` + `README.md` · `assets/` · galeri lokal `index.html`. Versi online: https://claude.ai/artifact/AhQMMNhCUoWoz5Xk1612J8

Sistem desain website company profile **PT Ape Gale Indonesia** (apegale.com): layanan perizinan ekspatriat, *expatriate hosting*, dan *manpower supply* sejak 20+ tahun, dengan jaringan 35+ kota. Arahnya **korporat yang hangat**: kerangka bidang diagonal maroon dan foto gedung kota dari Company Profile 2026, ditambah nada santai-edukatif dari Instagram @apegaleindonesia. Lihat kartu **Moodboard** untuk semua referensi visual.

## Konten

**Bahasa.** Website dwibahasa, **Indonesia (default)** dan **English**, dipilih lewat `LanguageToggle`. Setiap teks punya dua versi di CMS; jangan mencampur dua bahasa dalam satu kalimat.

**Sapaan.** Pakai **"Anda"** di website (IG boleh santai, website tetap sopan). "Kami" untuk Ape Gale. Tanpa emoji.

**Istilah layanan tetap dalam bahasa Inggris** di kedua versi, ditulis Title Case: Broad Expatriate Hosting, Expatriate Formalities, Manpower Supply, Airport Escort, HR System & Consulting. "Legalitas Perusahaan" menjadi "Company Legalities" di versi EN. Istilah izin ditulis kapital sesuai dokumen resmi: KITAS, KITAP, RPTKA, IMTA, VITAS, MERP, SKTT, STM.

**Heading** pakai sentence case ("Mengapa memilih Ape Gale"); eyebrow KAPITAL. Tagline resmi: *Solutions Are Our Expertise*. Kalimat CTA dari IG: *Your Partner for Immigration & Expatriate* dan *Got questions? Talk to us.*

**Angka resmi:** 20+ tahun pengalaman, 35+ kota. Kontak: (021) 5092 8670 · 0811 9996 286 · apegale.admin@apegale.com · Ascott Sudirman Jakarta, Affirmate Floor 31st Ciputra World II, Jl. Prof. Dr. Satrio Kav. 11, Karet Kuningan, Setiabudi, Jakarta Selatan.

**Jangan mengarang** testimoni, harga, atau angka. Komponen `Testimonial` dan `PriceTable` di sini memakai teks contoh bertanda; isi asli datang dari klien lewat CMS.

## Warna

- Halaman di `surface`, section selang-seling di `surface-soft`, kartu di `surface-raised` dengan border `line` dan `shadow-card`.
- Teks `ink`; teks sekunder `ink-muted`; link, eyebrow, dan kata sorotan di heading `brand-text`.
- **`maroon`** adalah warna identitas: tombol utama, blok diagonal, ikon dalam lingkaran. Teks di atasnya selalu `on-brand`. Hover `maroon-hover`.
- **`maroon-deep`** untuk topbar, footer, dan bidang terdalam di hero.
- **`red`** hanya aksen kecil (titik dan angka statistik besar). Satu layar tidak boleh didominasi `red`.
- `brand-tint` untuk status aktif (toggle bahasa, badge, baris harga terpilih).
- `whatsapp` hanya untuk tombol WhatsApp. `danger` dan `success` hanya untuk form, selalu dengan ikon + kata.
- Border input pakai `line-strong`, bukan `line`.
- Jangan pakai oranye, kuning, atau biru dari website lama.

## Tipografi

- **Jost** (`display`) untuk heading, angka, dan tombol: geometris seperti wordmark logo. **Source Sans 3** (`body`) untuk teks isi, menu panjang, dan teks regulasi. Keduanya dari Google Fonts.
- Skala: `display-xl` hanya di hero; `heading-1` judul halaman; `heading-2` judul section; `heading-3` judul kartu; `eyebrow` di atas setiap `heading-2`; `body-lg` untuk intro; `body` untuk isi; `small` untuk meta; `caption` untuk badge dan toggle.
- Di mobile (<768px) turunkan heading sesuai catatan di tiap gaya. Panjang baris teks isi maks. 68 karakter. Heading `text-wrap: balance`.

## Bentuk & tata letak

- **Motif utama: bidang diagonal** dari cover compro. Sudut potongan ±60° (clip-path), dipakai di hero, pembuka section gelap, dan header halaman dalam. Maksimal satu bidang diagonal besar per layar.
- **Motif kedua: daun & titik logo** — bentuk lensa dan lingkaran kecil `red` sebagai aksen; jangan menggambar ulang logo.
- Container `container` (1200px), gutter `space-4` mobile / `space-8` desktop. Padding section `space-12` / `space-16` / `space-24`. Grid kartu: 3 kolom desktop, 2 tablet, 1 mobile, gap `space-6`.
- Radius: `radius-sm` input, `radius-md` tombol & kartu berita, `radius-lg` kartu layanan & form, `radius-pill` toggle dan WA.
- Fokus keyboard: outline 2px `focus`, offset 2px, di semua elemen interaktif.
- Gerak (keputusan owner #26): transisi warna/bayangan 200ms dan kartu naik 4px saat hover, ditambah reveal section/grid sekali saat masuk viewport serta feedback menu, FAQ, tombol, filter dan form sesuai `../docs/PLAN.md` bagian 3. CSS biasa + IntersectionObserver, tanpa library animasi; total JavaScript tambahan motion maksimal 3 KB gzip dan Lighthouse tetap ≥90. Semua nilai gerak memakai token. Konten utama hero langsung terlihat, tanpa slider otomatis, parallax atau gerak berulang. Hormati `prefers-reduced-motion` (konten langsung terlihat tanpa gerak), tampilkan konten bila JavaScript tidak tersedia, dan pertahankan fokus/keyboard serta akses mobile.

## Foto & ilustrasi

- Foto nyata: gedung & kantor Ciputra World (compro hal. 6), tim, founder, dan talent dari konten IG. Nada hangat, kontras sedang, sering dipotong diagonal.
- **Dilarang:** foto stok dengan watermark (handshake Shutterstock di compro hal. 8), mockup slider lama, ilustrasi 3D generik.
- Foto di atas blok `maroon` boleh diberi overlay `maroon-deep` 60% agar teks `on-brand` terbaca.

## Ikon

- Gaya garis 2px, sudut membulat, ukuran 20/24px — dipakai **Lucide** (ISC) sebagai pengganti ikon kustom compro, yang tidak tersedia sebagai file. Ikon keunggulan dan layanan diletakkan di lingkaran `brand-tint` 56px dengan stroke `maroon`.
- Tanpa emoji sebagai ikon. Ikon sosial (Instagram, LinkedIn, YouTube, WhatsApp) memakai bentuk resmi masing-masing.

## Logo

- Pakai file di grup **Logos**: `apegale-logo.png` di latar terang, `apegale-logo-on-dark.png` di `maroon-deep`/tema gelap, `apegale-logo-white.png` di atas foto atau `maroon`. `apegale-mark.png` untuk favicon & ruang sempit.
- Area kosong minimal setinggi titik merah logo di semua sisi. Tinggi logo header 40px desktop / 32px mobile. Jangan memutar, mengganti warna daun, atau memberi bayangan.

## Logo klien

Hanya 11 klien dari Company Profile 2026 hal. 8: Affirmate, KSB, AdaKami, unicharm, CHINT, Ferbeck, allnex, Lalamove, Apple, Neo Energy, Taiheiyo Cement. Tampilkan seragam abu (grayscale, opasitas 70%) dan berwarna saat hover. Lima yang tersedia sebagai file ada di grup **Clients**; enam lainnya pakai SVG resmi brand.

## Revisi UI sesuai arahan owner 09 Oktober 2026

Arahan terbaru: company profile lebih bersih, spacing konsisten, dan copy diparafrase. Implementasi publik memakai kartu datar, daftar fitur dan FAQ dengan jarak yang jelas, serta hero mobile dengan teks lebih dahulu. Palet, font, foto, urutan layanan, dan data resmi tetap. Token terbaru ada di `tokens.json`; CSS aplikasi ada di `src/styles/`. Preview awal tetap menjadi arsip baseline dan belum menggambarkan seluruh revisi ini. Rincian serta batas validasi ada di `docs/STEP-10-STATUS.md`, bagian penyederhanaan UI dan parafrase.

Arahan lanjutan owner: hapus garis pendek dekoratif di depan label/judul serta separator ornamental pada blok konten. Gunakan whitespace untuk memisahkan konten.

## Desain v2 (12 Okt 2026): adopsi template brosur terang

Acuan: `../template_design.jpeg` (template brosur putih–merah, judul serif, bentuk organik). Konten, copy, struktur halaman, dan urutan section **tidak berubah**; yang berubah hanya kulit visual, diimplementasikan sebagai lapisan `src/styles/pivot.css` (dimuat terakhir) + penyesuaian `tokens.css`/`tokens.json` (abu netral `#f4f4f5`, radius xl 24px, bayangan lembut) + font serif **Playfair Display** untuk H1/H2 (Jost tetap untuk H3, tombol, nav; Source Sans 3 untuk isi).

Terjemahan template → web:
- Cover → Hero: foto dalam bentuk D besar (radius kiri 300px) dengan bulan sabit maroon dan titik merah di bawah kirinya; judul serif, eyebrow merah kecil, dua tombol pill, statistik serif merah.
- Halaman dalam: header putih, judul serif, breadcrumb abu, blob abu besar + ubin merah membulat di kanan (bukan slab diagonal maroon).
- Solusi modular → Layanan: ubin putih sudut 24px, bayangan lembut, ikon dalam lingkaran abu; hover seluruh ubin menjadi maroon.
- Proses bernomor → "Mengapa Ape Gale" dan Modul GARIS: 01–04 di atas ikon lingkaran pada satu rel, langkah terakhir merah.
- Story + kartu merah → Tentang Kami: foto dalam bentuk organik (tiga sudut 200px) dengan ubin maroon di belakang kanan-bawah; Visi menjadi kartu maroon, Misi kartu abu.
- Insights → FAQ: baris membulat putih, baris terbuka maroon.
- Penutup → CTA: panel abu terang dengan lingkaran maroon samar; form dalam kartu putih.
- Footer tetap maroon-deep (jangkar brand), tepi atas membulat.
Shape lock: tombol/chip pill · kartu/panel 24px · input 10px · foto organik. Slab diagonal maroon, section maroon penuh, dan garis tipis di atas statistik dihapus.
Arsip gaya lama: `.data/pivot-backup-20261012/` (tokens, layout) dan semua CSS lama tetap ada sebagai basis; `pivot.css` hanya menimpa.
Verifikasi: 1440px dan 390px semua halaman utama, screenshot di `../_review/screenshots-v2/`.

## Desain v3 (12 Okt 2026): struktur mengikuti template 10 slide

Konten dan urutan halaman tidak berubah. Hanya struktur visual yang dipetakan ke slide template (`Apegale/template_design.jpeg`). Gaya ada di `src/styles/template.css`, dimuat setelah `pivot.css`.

| Seksi Beranda (urutan tetap) | Slide template | Komponen |
|---|---|---|
| Hero | 01 Cover: foto berbentuk organik + gelombang merah | `Hero` |
| Klien | 07 Partnership: marquee di panel putih di atas pita abu | `ClientStrip` |
| Layanan | 03 Solution: judul, foto di dalam cincin + lencana merah, daftar layanan mengikuti busur | `home/ServiceOrbit.tsx` (hanya di Beranda) |
| Mengapa Ape Gale | 05 Process: rel bernomor | `WhySection` |
| GARIS | 09 Modular: teks kiri, tile modul (pertama merah) + tile tangkapan layar | `home/GarisSection.tsx` |
| Jaringan | 04 Impact: tile angka abu, tile peta, tile kota merah | `home/NetworkSection.tsx` (tanpa angka: tata letak dua tile) |
| Tentang Kami | 02 Story: foto pendiri dalam blob + kartu merah nama/jabatan | `home/AboutSection.tsx` |
| FAQ | 08 Insights: baris terbuka merah | `FAQList` |
| Kontak | 10 Closing: teks kiri, formulir di atas blob abu + aksen merah | `home/ContactCta.tsx` |

Halaman dalam memakai penutup slide 10 lewat `layout/CtaBanner.tsx`. Token spasi `--space-5`, `--space-10`, `--space-20` ditambahkan karena sebelumnya dipakai tetapi tidak terdefinisi. Tangkapan layar: `Apegale/_review/screenshots-v3/`.

## Hierarki v4 (12 Okt 2026)

Urutan baca tiap tampilan: judul, paragraf pembuka, satu aksi utama, lalu detail pendukung. Aturan ada di `src/styles/hierarchy.css` (dimuat paling akhir). Copy dan urutan seksi tidak berubah.

**Skala huruf** (token `--fs-*` / `--lh-*` di `design/tokens.json`):

| Peran | Desktop | Mobile |
|---|---|---|
| H1 Beranda | 64/70 | 40/46 |
| H1 halaman dalam | 52/58 | 36/42 |
| H2 section dan penutup | 40/46 | 30/36 |
| H3 item | 20/28 | 20/28 |
| Paragraf pembuka | 19/30 | 17/28 |
| Teks pendukung | 14/22, batas bawah | sama |

**Tangga aksi:** primer = pil maroon besar (satu per tampilan) · WhatsApp = pil hijau · sekunder = outline tipis · tersier = tautan teks · belum tersedia = chip kecil abu, selalu setelah aksi yang aktif di barisnya. Tombol header memakai ukuran kecil agar tidak menyaingi tombol utama hero.

**Hero:** angka 20+ / 35+ diturunkan menjadi bukti pendukung (ukuran 32, warna tinta, dipisah garis tipis) supaya tidak bersaing dengan judul.

**Layanan:** judul di kiri atas, lingkaran foto di bawahnya, daftar layanan di kanan dengan tepi kiri lurus.

**Token:** nilai v2 yang dulu ditulis langsung ke `tokens.css` (bayangan, radius, `--surface-tile`, `--font-serif`) dan `--space-5/10/20` sekarang tercatat di `tokens.json`, jadi `npm run tokens` tidak lagi menghapusnya.

## Palet dan font dari Company Profile 2026 (12 Okt 2026)

Sumber: `Apegale/Company Profile_APE GALE INDONESIA_2026.pdf`, diambil langsung dari warna dan font di dalam PDF. Gaya ada di `src/styles/compro.css` (dimuat paling akhir). Playfair Display, Jost dan Source Sans 3 tidak dipakai lagi.

| Token | Nilai | Asal di PDF |
|---|---|---|
| `--maroon` | #981A2F | Warna judul dan panel utama |
| `--maroon-hover` | #A21C30 | Judul "Our Services" |
| `--maroon-deep` | #740F22 | Pita gelap, dipakai untuk footer |
| `--red` | #BE2130 | Aksen merah |
| `--ink` | #231F20 | Teks utama |
| `--ink-muted` | #424143 | Teks abu |
| `--surface-tile` | #EDE3E2 | Tint hangat sampul |
| `--surface-soft` | #F6F0EF | Versi lebih terang dari #EDE3E2 untuk latar seksi |
| `--charcoal` | #24282A | Panel gelap |

**Font:** Roboto untuk judul dan teks. Judul H1/H2 memakai Roboto Bold huruf kapital, dengan frasa kunci berwarna maroon seperti "WHO **WE ARE**". Judul Beranda memakai Roboto Black seperti "PROFILE" di sampul. Label kecil memakai Montserrat ExtraBold.

**Pengecualian:** tombol WhatsApp tetap #0F7A3F. Hijau di PDF (#189547) tidak memenuhi kontras 4.5:1 untuk teks putih.

Cadangan file sebelum perubahan: `.data/compro-backup-20261012/`.

## Sistem visual v6 (12 Okt 2026): geometri diagonal dari Company Profile

Menggantikan gaya template generik (pil, kartu berbayang, blob organik, lingkaran, gradien). Aturan ada di `src/styles/system.css` (dimuat paling akhir). Copy dan urutan seksi tidak berubah.

1. **Tepi tajam.** Semua token radius 0 dan semua bayangan `none`. Bentuk khas datang dari potongan diagonal `--slant` (14%), kemiringan yang dipakai PDF pada foto dan pita maroon.
2. **Potongan diagonal pada foto.** Foto hero, foto layanan, dan foto pendiri dipotong miring. Di hero, dua pita maroon dan merah mengikuti tepi miring foto seperti di sampul PDF.
3. **Baji maroon.** Segitiga maroon di pojok kanan atas tiap pita berwarna tint dan di header halaman, seperti di halaman PDF. Footer juga dipotong miring di tepi atasnya.
4. **Garis, bukan kartu.** Kelompok konten dipisah garis tinta 2px (`--rule`) dan hairline. Daftar layanan bernomor 01 sampai 06 di atas garis. FAQ menjadi daftar bergaris, dan pertanyaan yang terbuka ditandai batang maroon di kiri. Kartu layanan, nilai, berita, dokumen, dan organigram menjadi blok datar dengan garis atas.
5. **Kontrol.** Tombol persegi. Utama = maroon. Sekunder = outline tinta 2px. Tersier = teks bergaris bawah. Belum tersedia = kotak putus-putus kecil. Menu aktif ditandai garis bawah maroon, bukan titik.
6. **Penutup.** Formulir duduk di atas bidang maroon miring.

Tidak ada gradien dekoratif. Yang tersisa hanya mask pudar di tepi marquee logo, karena fungsinya menyembunyikan potongan logo.

Cadangan sebelum perubahan: `.data/system-backup-20261012/`.

## Hero v7 (12 Okt 2026): above the fold menjawab empat pertanyaan

Copy hero ditulis ulang atas permintaan owner. Sumber teks ada di `content/seed/home.json`, disalin ke CMS dengan `npm run content:copy`. Faktanya diambil dari konten layanan yang sudah ada, yaitu RPTKA, KITAS, dan Manpower Supply.

| Pertanyaan | Elemen | ID |
|---|---|---|
| Untuk siapa | Eyebrow | Untuk perusahaan yang mempekerjakan tenaga kerja asing |
| Apa | H1 | Perizinan ekspatriat & tenaga kerja |
| Kenapa penting | Paragraf + angka 20+ / 35+ | RPTKA, KITAS, hingga tenaga alih daya kami urus dari dokumen sampai selesai, agar operasional Anda tetap patuh aturan. |
| Langkah berikutnya | Tombol utama | Minta penawaran (ke Hubungi Kami, label sama dengan tombol header) |

Tombol kedua menjadi "Lihat layanan". Tagline "Conversant Expatriate Services" tidak lagi tampil di hero. H1 hero 56/60 desktop, 46/50 tablet, 34/38 mobile, maksimal 3 baris.

## Review v8 (12 Okt 2026): 10 masalah desain berdampak terbesar

Situs yang berjalan direview di desktop 1440 dan mobile 390, diperbaiki, lalu direview ulang. Perbaikan ada di bagian akhir `src/styles/system.css`. Dua perbaikan mengubah kode: foto layanan di Beranda dan angka di blok Jaringan Beranda dihapus karena mengulang hero.

1. Ikon di panel kontak tidak terlihat (maroon di atas maroon). Sekarang putih.
2. Bentuk miring header halaman menutupi teks di mobile. Sekarang jadi pita rendah di bawah.
3. Ada celah putih antara bidang maroon penutup dan footer. Sekarang bidang penutup setinggi seksi dan footer bertepi lurus dengan garis merah.
4. Foto rapat yang sama tampil dua kali (hero dan layanan). Foto layanan dihapus, judul layanan menempel (sticky) di samping daftar.
5. Angka 20+ dan 35+ tampil dua kali di Beranda. Panel angka di blok Jaringan Beranda dihapus (halaman Tentang Kami tidak berubah).
6. Baji maroon diulang di setiap pita tint sehingga kehilangan makna. Sekarang hanya di header halaman.
7. Tanda logo merah hampir hilang di footer maroon. Logo footer sekarang putih.
8. Tombol GARIS yang belum aktif tampil seperti kotak rusak (garis putus-putus). Sekarang chip abu tenang.
9. Judul Profil Perusahaan melayang jauh dari teksnya. Jaraknya dirapatkan.
10. Seksi putih berurutan menyatu tanpa batas. Sekarang ada hairline dan jarak yang lebih pendek.

Review ulang menemukan dua hal baru dan keduanya diperbaiki: bidang maroon penutup terpotong menjadi strip di samping formulir, dan ikon WhatsApp di tombol hijau berwarna maroon.

**Sudut:** atas permintaan owner, tombol, field dan chip memakai radius 6px, kartu dan panel 10px. Kartu memakai bingkai tipis 1px, bukan garis atas tebal. Foto tetap dipotong diagonal.

## Review v9 (12 Okt 2026): putaran kedua, 10 masalah

Perbaikan ada di bagian akhir `src/styles/system.css`. Satu perubahan kode: pilihan layanan di formulir kontak lengkap kini selebar penuh.

1. Kartu Direktur di struktur organisasi kehilangan warna maroon pada putaran pertama, jadi teks putih di atas putih. Sekarang maroon lagi.
2. Layanan di Beranda menyisakan kolom kiri kosong setengah halaman setelah foto dihapus. Sekarang judul di atas dan enam layanan dalam dua kolom bernomor.
3. Panah dropdown menu melayang jauh dari labelnya. Sekarang menempel.
4. Logo klien berbeda ukuran optis (AdaKami besar, Unicharm kecil). Sekarang tiap logo di kotak yang sama.
5. Seksi dengan satu kartu (Jenis Layanan) menampilkan kartu yatim di grid tiga kolom. Sekarang satu baris lebar.
6. Chip filter Regulasi membungkus jadi baris yatim. Di desktop dibuat lebih ringkas, di mobile digeser ke samping.
7. Pilihan layanan di formulir kontak hanya setengah lebar dan meninggalkan celah. Sekarang penuh.
8. Bidang maroon penutup di halaman dalam terlalu lebar dan kosong. Sekarang lebih sempit.
9. Foto pendiri di mobile tidak memenuhi kolom. Sekarang penuh.
10. Label angka hero bahasa Inggris terpotong ke dua baris. Sekarang satu baris.

Review ulang menemukan dua masalah baru, keduanya sudah diperbaiki: judul layanan Beranda menimpa daftar, dan halaman Regulasi mobile bisa digeser ke samping karena baris chip. Sisa yang diterima: di desktop satu chip Regulasi masih turun ke baris kedua karena enam nama kategori terlalu panjang.

Catatan: kotak screenshot GARIS tampak kosong di screenshot headless, tetapi tampil benar di Chrome biasa. Ini bukan bug situs.

## Desain v9 (13 Okt 2026): template 10 slide gelap, palet Company Profile tetap

Acuan: `../template_design.jpeg` (template company profile 10 slide: bidang gelap, foto dipotong diagonal, judul kapital dua warna dengan garis aksen pendek, segitiga warna di pojok kanan bawah, kartu putih berikon). Biru dan navy template diganti palet lama: **charcoal** `#24282A` untuk bidang gelap, **maroon** untuk aksen di latar terang, **red** untuk aksen di latar gelap. Konten, copy, dan urutan seksi tidak berubah.

**CSS diganti total.** Sembilan lapisan override lama (`components`, `brand`, `pivot`, `template`, `hierarchy`, `compro`, `system`, serta `shell`/`home`/`pages` versi lama) dihapus dan ditulis ulang menjadi empat file: `base.css` (konteks warna, tipe, tombol, kartu, form), `shell.css` (topbar, header, menu, footer), `home.css` (seksi Beranda), `pages.css` (halaman dalam). Urutan muat: `tokens → base → shell → home → pages → motion`. Riwayat lama ada di git.

**Konteks warna.** Setiap bidang gelap (`.ag-dark`, `.ag-section--dark`, panel kontak, kartu visi, kartu direktur) menukar custom property `--c-head`, `--c-hl`, `--c-muted`, `--c-icon`, `--btn-pri`, `--wedge-c`, jadi judul, tombol, ikon, dan baji otomatis benar di latar gelap maupun terang. Formulir selalu kembali ke konteks terang.

| Slide template | Bagian situs |
|---|---|
| 01 Cover | Hero: bidang charcoal, foto kanan dipotong diagonal + garis merah di potongan, baji merah |
| 08 Trusted by | Pita klien tepat di bawah hero: label kiri, marquee kanan |
| 04 Our services | Kartu layanan: ikon heksagon maroon, judul kapital, bilah aksen yang terisi saat hover; tautan "Lihat layanan" di kanan judul |
| 03 Our approach | "Mengapa Ape Gale": bidang charcoal, judul kiri, empat poin berikon di kanan |
| 06 Case study | GARIS: checklist modul + aksi di kiri, screenshot di atas bidang maroon diagonal |
| 05 Performance | Jaringan: kartu peta putih + kartu kota charcoal |
| 02 Who we are | Tentang Kami: teks kiri, founder di panel charcoal diagonal + kartu nama |
| 09 Clients say | Testimoni (muncul bila ada data): kartu kutipan di bidang charcoal |
| 10 Let's build | Penutup Beranda: judul dua warna, baris kontak berikon, formulir putih. Halaman dalam memakai versi banner |
| (semua slide) | Header halaman dalam: bidang charcoal + bidang maroon diagonal + baji |

**Audit dan perbaikan hierarki.**

| Aspek | Sebelum | Sesudah |
|---|---|---|
| Urutan baca | Semua seksi putih/krem dengan judul hitam sama berat; mata tidak tahu mulai dari mana | Ritme gelap–terang: hero gelap → layanan terang → alasan gelap → GARIS terang → … → penutup gelap. Titik fokus pertama selalu judul hero |
| Tipografi | H2 40/46, frasa sorotan kosong di hampir semua judul | Skala baru: H1 hero 60/64 (Black), H1 dalam 48/54, H2 38/44 (Bold), H3 kartu 18/26 kapital; mobile 36/32/28. Setiap judul seksi dua warna (baris kedua maroon/merah) + garis aksen 48×4 |
| Spasi | Jarak judul–isi dan padding kartu tidak seragam antar-lapisan CSS | Seksi 96 / 64 (mobile), judul→isi 48 / 32, kartu 32 / 24, grid gap 24 / 16 |
| Perataan | Layanan berupa daftar dua kolom dengan judul melayang; GARIS punya kotak kosong | Semua seksi rata kiri di satu kontainer 1200; kartu dalam grid 3/2/1 kolom dengan tinggi sama |
| CTA | Hero dan penutup sama-sama punya dua tombol kuat; tombol "Segera hadir" bersaing dengan WhatsApp | Satu aksi utama per tampilan: hero = Minta penawaran (56px, merah di latar gelap), penutup Beranda = Kirim pesan (lebar penuh di kartu). WhatsApp di penutup menjadi baris kontak. Aksi nonaktif kecil dan selalu setelah aksi aktif |

**Pengecualian palet.** Tombol utama di bidang gelap memakai `red` (maroon terlalu gelap di atas charcoal). Frasa sorotan judul di latar gelap memakai `accent-on-dark` `#E0414F` (red tema gelap, 3.6:1, hanya untuk teks ≥ 24px tebal). Teks kecil di latar gelap tetap putih 78%.

**Token baru** (`tokens.json` v3): `accent-on-dark`, `brand-text-on-dark`, `fs-*-t`/`fs-*-m`, `wedge`, `wedge-m`, `bar-w`, `bar-h`; bayangan kartu tipis dihidupkan lagi.

Verifikasi: 360, 390, 820, 1024, 1440 px di Beranda dan semua halaman dalam (ID + EN), tanpa scroll horizontal; menu mobile diuji tap, submenu, dan Escape; `typecheck`, `lint`, 27 test, `build` lulus.

## Desain v10 (13 Okt 2026): "Garis merah", putih dominan

Arahan owner: buang gradien generik, kartu berlebihan, pill, dan tata letak yang mudah ditebak; bangun sistem visual yang khas. Palet: merah, putih, gradasi merah, sorotan maroon, dominasi putih. Menggantikan v9 (bidang charcoal dihapus). Konten, copy, dan urutan seksi tidak berubah.

**Tanda khas: garis miring merah.** Gradasi `--red-gradient` (red → maroon → maroon-deep, 118°) hanya dipakai sebagai: pita miring tebal di potongan foto hero, garis miring di header halaman dalam, penanda indeks seksi, daratan peta jaringan, dan **satu bidang merah besar per tampilan** (Beranda: "Mengapa Ape Gale" dan penutup; halaman dalam: banner penutup). Tidak ada gradien sebagai latar dekoratif.

**Tanpa kotak, tanpa pill.** Semua radius 0, semua bayangan `none`. Struktur dari garis rambut (`line`), garis tinta 1px di atas daftar, dan whitespace. Layanan, nilai, berita, dokumen, FAQ, misi, fitur GARIS, kontak menjadi entri terbuka bernomor di bawah garis rambut. Toggle bahasa jadi dua kata bergaris bawah; filter kategori jadi tab bergaris bawah; field formulir bergaris bawah.

**Tombol.** Tombol berisi (primer merah, WhatsApp, terang) punya ujung kanan terpotong miring, digambar di `::before` supaya cincin fokus tetap utuh. Sekunder = outline tinta tajam; tersier = tautan bergaris bawah 2px; belum tersedia = teks redup dengan garis putus-putus.

**Tata letak tidak terduga.** Nomor indeks seksi di Beranda (`01`–`07`) dengan garis miring; judul Layanan menempel (sticky) di kolom kiri sementara enam layanan berjalan sebagai indeks dua kolom; "Mengapa" sebagai buku besar bernomor besar bergaris luar di bidang merah; screenshot GARIS menembus ke luar kontainer di atas garis miring; founder dipotong di atas garis miring dengan nama di bawah garis maroon.

**Tipografi.** Roboto Black kapital dengan tracking rapat: H1 hero 76/76 (tablet 56, mobile 40), H1 halaman 60/62 (mobile 36), H2 46/50 (mobile 30). Label Montserrat ExtraBold 11–13px tracking lebar untuk eyebrow, nomor, breadcrumb, label form. Isi 17/28.

**Konteks warna.** `.ag-red` / `.ag-section--red` menukar custom property (judul putih, sorotan `brand-tint`, tombol putih bertulisan maroon, WhatsApp putih bertulisan hijau). Formulir selalu konteks putih.

**Token** (`tokens.json` v4): `red-gradient`, `red-gradient-v`, `slash-w`; radius 0; bayangan none; skala huruf baru.

**Penyimpangan dari aturan lama yang disengaja:** toggle bahasa bukan pill lagi (AGENTS.md menyebut pill) dan tombol bersudut tajam (v8 memakai 6px), keduanya atas arahan owner "tanpa pill".

Verifikasi: Beranda dan halaman dalam di 360/390/820/1024/1440 px tanpa scroll horizontal; menu mobile (tap, submenu, Escape) dan peta interaktif diuji; `typecheck`, `lint`, 27 test, `build` lulus.

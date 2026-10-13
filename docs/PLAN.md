# Rencana implementasi Ape Gale Indonesia

Tanggal: 08 Oktober 2026. Status: rencana diselaraskan dengan keputusan owner #10–#26; langkah 1 sedang dikerjakan dan belum lolos pemeriksaan runtime. Lihat [STEP-1-STATUS.md](STEP-1-STATUS.md).
Root aplikasi yang direncanakan adalah folder web/ yang memuat AGENTS.md ini. Semua path di bawah relatif terhadap folder tersebut.

Dasar: AGENTS.md; docs/01-brief.md; design/README.md; design/index.html; seluruh 17 preview komponen dan 15 README komponen yang tersedia; docs/02-sitemap-dan-template.md; docs/03-cms-payload.md; seluruh 8 JSON content/seed; docs/04-acceptance.md; docs/00-riset-uiux.md (konteks saja); docs/OPEN-QUESTIONS.md. tokens.json dan components.css juga dibaca untuk memeriksa kesiapan styling. README Cover dan Moodboard tidak tersedia. Pembacaan preview pada tahap ini adalah pembacaan HTML; pembandingan visual browser dijadwalkan saat implementasi.

## 1. Ringkasan proyek dalam 5 poin

1. Membangun ulang apegale.com untuk PT Ape Gale Indonesia, bagian Affirmate Group, sebagai website company profile dwibahasa: Indonesia di URL tanpa prefix dan English di /en. Ruang lingkup mencakup Home, Tentang Kami, Layanan beserta detail dan harga, GARIS, Regulasi, News, dan Hubungi Kami. Estimasi quotation dua minggu dengan maksimal dua revisi desain; aplikasi GARIS, ERP, pembayaran, dan blog multi-penulis di luar scope.
2. Stack tetap: Next.js App Router + TypeScript dan Payload CMS 3 dalam satu aplikasi, PostgreSQL, upload lokal persisten, next/image, Jost + Source Sans 3 melalui next/font/google, serta lucide-react. Versi stable yang kompatibel diperiksa saat instalasi, dipin bersama lockfile; adapter SQLite hanya pengganti bila hosting tidak mendukung PostgreSQL.
3. Desain mengikuti brand book dan markup/class ag-* dari preview: tema terang, diagonal maroon, CSS biasa berbasis token, tanpa Tailwind/UI kit/CSS-in-JS dan tanpa slider hero otomatis. Animasi masuk section dan feedback interaksi ditambahkan sesuai arahan pengguna (rincian pada bagian 3). Implementasi responsif dan WCAG 2.2 AA, area sentuh minimum 44px tanpa mengubah ukuran visual preview, fokus terlihat, keyboard, serta reduced motion wajib.
4. Konten dan fakta berasal dari seed/CMS serta migrasi sumber lama yang telah diperiksa: 20+ tahun, 35+ kota, enam layanan utama dalam urutan resmi dan hanya 11 klien. Telepon (021) 5092 8670, WhatsApp 0811 9996 286, email apegale.admin@apegale.com, alamat Ascott Sudirman Jakarta, Affirmate Floor 31st Ciputra World II, Jl. Prof. Dr. Satrio Kav. 11, Karet Kuningan, Setiabudi, Jakarta Selatan. Tidak mengarang harga, testimoni, kutipan, atau fakta legal; GARIS tetap ditampilkan dengan Login/Coba Gratis disabled sampai diaktifkan lewat CMS.
5. Hasil akhir harus dapat dikelola admin dalam dua bahasa, mendukung draft/publish dan preview, seed berulang tanpa duplikat, form tersimpan sekaligus mengirim email, SEO dan redirect lama lengkap. Setiap halaman dibandingkan pada 1440px dan 390px; QA mencakup 360–1920px, Lighthouse mobile minimal 90 untuk empat kategori yang diminta, serta panduan deploy/backup hosting klien.

## 2. Struktur folder aplikasi yang akan dibuat

Struktur ini adalah rancangan, bukan file yang sudah diimplementasikan. Dokumen, seed sumber, preview, dan aset desain yang ada tetap menjadi sumber acuan.

~~~text
web/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── layout.tsx                 # satu root layout publik untuk ID dan EN
│   │   │   ├── (id)/                     # route group, tidak muncul dalam URL
│   │   │   │   ├── page.tsx
│   │   │   │   ├── tentang-kami/page.tsx
│   │   │   │   ├── layanan/page.tsx
│   │   │   │   ├── layanan/[slug]/page.tsx
│   │   │   │   ├── garis/page.tsx
│   │   │   │   ├── regulasi/page.tsx
│   │   │   │   ├── regulasi/[slug]/page.tsx
│   │   │   │   ├── news/page.tsx
│   │   │   │   ├── news/[slug]/page.tsx
│   │   │   │   └── hubungi-kami/page.tsx
│   │   │   ├── en/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── about/page.tsx
│   │   │   │   ├── services/page.tsx
│   │   │   │   ├── services/[slug]/page.tsx
│   │   │   │   ├── garis/page.tsx
│   │   │   │   ├── regulations/page.tsx
│   │   │   │   ├── regulations/[slug]/page.tsx
│   │   │   │   ├── news/page.tsx
│   │   │   │   ├── news/[slug]/page.tsx
│   │   │   │   ├── contact/page.tsx
│   │   │   │   └── not-found.tsx
│   │   │   └── not-found.tsx
│   │   ├── (payload)/                    # berkas integrasi hasil scaffold Payload
│   │   │   ├── layout.tsx
│   │   │   ├── admin/[[...segments]]/page.tsx
│   │   │   └── api/[...slug]/route.ts
│   │   ├── api/inquiries/route.ts
│   │   ├── api/preview/route.ts
│   │   ├── api/exit-preview/route.ts
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── collections/
│   │   ├── Services.ts
│   │   ├── Testimonials.ts
│   │   ├── Clients.ts
│   │   ├── Faqs.ts
│   │   ├── Posts.ts
│   │   ├── Regulations.ts
│   │   ├── Media.ts
│   │   ├── Inquiries.ts
│   │   └── Users.ts
│   ├── globals/
│   │   ├── Site.ts
│   │   ├── Home.ts
│   │   ├── About.ts
│   │   ├── Garis.ts
│   │   └── Ui.ts                         # kamus UI dan intro halaman statis
│   ├── components/
│   │   ├── ui/                           # Button, SectionHeading, StatBadge
│   │   ├── layout/                       # Header, Footer, LanguageToggle, WhatsAppFloat
│   │   ├── content/                      # kartu, FAQ, tabel harga, rich text
│   │   ├── forms/                        # ContactForm
│   │   ├── motion/                       # Reveal dan RevealGroup
│   │   ├── sections/                     # Hero, Why, GARIS, jaringan, founder, CTA
│   │   ├── templates/                    # template bersama ID/EN
│   │   └── seo/                          # JSON-LD dari data yang benar-benar tampil
│   ├── styles/
│   │   ├── tokens.css                    # hasil generate dari design/tokens.json
│   │   ├── components.css                # basis CSS ag-*, font import dihapus
│   │   ├── motion.css                    # animasi bersama dan reduced motion
│   │   └── globals.css                   # layout/responsif/interaksi tambahan berbasis token
│   ├── seed/
│   │   ├── index.ts
│   │   ├── normalize.ts                  # locale, rich text, hubungan parent
│   │   ├── media.ts                      # upload idempoten + alt
│   │   └── manifest.ts                   # kunci stabil FAQ/media dan sumber migrasi
│   ├── i18n/
│   │   ├── config.ts                     # id default; en; fallback CMS
│   │   ├── routes.ts                     # pasangan URL, slug, query, anchor
│   │   ├── dictionary.ts                 # label UI dari global ui/seed
│   │   ├── request-locale.ts             # locale SSR dari request publik
│   │   └── LanguageSync.tsx              # html lang dan preferensi localStorage
│   ├── lib/                             # query CMS, akses, SEO, email, validasi form
│   ├── migrations/                      # migrasi schema database
│   ├── payload.config.ts
│   └── payload-types.ts                  # tipe hasil generate
├── public/                              # favicon dan aset publik yang diizinkan
├── media/                               # upload CMS; volume persisten, bukan bundle build
├── scripts/                             # generator token bila belum tersedia
├── tests/                               # verifikasi alur penting dan QA browser
├── content/seed/                         # 8 sumber JSON yang sudah tersedia
├── legacy/                              # 33 HTML lama, img, PDF compro dan README migrasi
├── design/                              # sumber desain yang sudah tersedia
├── docs/                                # PLAN, OPEN-QUESTIONS dan panduan
├── next.config.ts                       # redirect URL lama dan konfigurasi image
├── package.json + lockfile
└── .env.example
~~~

Route ID dan EN berupa pembungkus tipis yang mengirim locale ke template bersama. Satu root layout publik mencegah pergantian bahasa melintasi root layout berbeda. Locale untuk HTML awal harus diketahui saat request, lalu LanguageSync menyelaraskannya saat client navigation; detail integrasi request/proxy mengikuti API versi Next.js yang dipasang. Route Payload tidak ikut aturan prefix bahasa publik. Tambahkan penanganan unknown path pada masing-masing locale saat scaffold agar 404 ID maupun EN berstatus 404 dan tidak menjadi halaman konten 200.

Pengambilan CMS dilakukan di server; menu interaktif, toggle bahasa, form, serta wrapper reveal kecil memakai client component; konten dan template tetap mengutamakan server component. Step 1 tidak membuat route/halaman frontend publik; struktur frontend di atas baru dikerjakan mulai langkah 2. Semua query publik memfilter published dan mematuhi akses; draft preview memakai autentikasi. Perubahan CMS harus terlihat tanpa deploy melalui pembacaan dinamis atau invalidasi cache pada publish, termasuk flags GARIS. Bahasa admin Indonesia; editor tidak boleh mengubah/menghapus site maupun users.

### Aliran data seed dan normalisasi

| Sumber | Tujuan | Penanganan |
|---|---|---|
| site.json | global site | Kontak, statistik, sosial, SEO terbaru kedua locale dan mapsUrl pencarian Google Maps Ciputra World 2 dari seed. |
| home.json | global home | Unggah hero/founder, pakai lead baru tanpa klaim akses GARIS real time. Simpan 13 cities dengan name/lat/lng untuk proyeksi SVG equirectangular; kutipan founder placeholder tidak dipublikasikan. |
| about.json | global about | Visi/misi/nilai kedua locale; parent nama dikonversi ke parentIndex. Organigram resmi boleh published, seluruh nama founder Deny Yandi Imran; greeting/profile dimigrasi dari legacy/ pada langkah 5. |
| garis.json | global garis | enabled false; URL kosong; dua images diunggah menjadi garis.gallery. features kosong dan section fitur disembunyikan; gunakan tiga varian. |
| services.json | collection services | 16 entri: 6 utama + 4 anak Expatriate Formalities + 6 anak Visa & Paspor. Upsert slug dulu, sambungkan parent pada pass kedua. body.source adalah tugas migrasi, bukan rich text. |
| clients.json | collection clients | 11 entri, upsert name; 5 logo upload dan 6 nama teks sementara; jangan menambah klien. |
| faqs.json | collection faqs | 5 FAQ, 4 featured yang sudah disetujui; FAQ GARIS terbaru menjelaskan persiapan relaunch. Konversi answer ke rich text, order dari seed dan upsert seedKey stabil. |
| ui-dictionary.json | global ui + src/i18n/dictionary.ts | Semua kelompok nav/cta/form/price/sections/lang; label UI tambahan selalu ID dan EN. |

Media di-upsert dengan kunci sumber stabil, bukan diunggah ulang setiap seed. Seed globals memakai slug global dan relasi memakai ID hasil lookup. Field metadata migrasi tidak dibocorkan ke publik. Seed kedua locale tidak menimpa locale satunya atau menggandakan array; rerun tidak boleh menurunkan konten editorial yang telah disunting tanpa mode eksplisit. Tidak membuat testimoni, harga, post, atau regulasi fiktif. Slug konten tidak dilokalkan. Nilai priceFrom kosong pada baris asli berarti Hubungi kami; array harga kosong berarti section tersembunyi.

### Field tambahan yang ditetapkan owner

Keputusan owner melengkapi docs/03; tidak lagi berstatus usulan. Implementasi langkah 1 mencakup:

| Lokasi | Field dan aturan |
|---|---|
| services | priceNote: textarea localized; priceUpdatedAt: date. priceItems tetap array dalam layanan, agregasi index hanya featured dari published. |
| garis | gallery: array upload media untuk dua screenshot seed; features tetap array kosong. intro localized tetap tersedia, disabled label memakai global ui. |
| ui | Global untuk seluruh ui-dictionary.json; group pages untuk intro localized opsional services, regulations, news, contact. Home/About memakai intro localized opsional pada global masing-masing; GARIS memakai intro yang sudah ada. Tidak mengarang isi intro. |
| inquiries | emailStatus: pending/sent/failed, default pending dan hanya admin. status bisnis tetap baru/dihubungi/selesai. Nama/WA/layanan/pesan wajib; email wajib pada varian full dan opsional compact, perusahaan opsional. variant disimpan untuk validasi server. Pengiriman email baru di langkah 8. |
| Koleksi berkonten | enReviewed: checkbox nonlokal default false, tampil sebagai kolom list admin pada services, testimonials, clients, faqs, posts, regulations, media. Ini penanda review, bukan penghalang tayang EN. |
| faqs dan media | seedKey: text unik nonlokal untuk upsert stabil. Kunci FAQ eksplisit dalam manifest; media berdasarkan path sumber; tidak bergantung pada pertanyaan yang dapat berubah. |
| home.network.cities | name, lat (-90–90), lng (-180–180). Proyeksi SVG kelak memakai bbox 95–141 BT, 6 LU–11 LS; tidak menyimpan x/y tebakan. |

Alt media ID/EN ditulis deskriptif setelah melihat gambar, tanpa klaim bisnis. Tidak menampilkan jam kerja. Akses inquiries admin saja; editor tidak dapat mengubah site/users. Dokumen legacy visa/regulasi tetap draft. Organigram resmi tidak menunggu konfirmasi ulang; Deny Yandi Imran dipakai konsisten. Lead hero/SEO/FAQ GARIS mengambil seed terbaru; Why Digital Monitoring tetap seperti sumber compro.

## 3. Pemetaan design/components ke React

Kontrak props berikut adalah rancangan TypeScript, bukan kode. Locale berarti id/en; teks dan objek CMS sudah diselesaikan ke locale aktif sebelum diteruskan. MediaRef memuat URL, ukuran dan alt lokal; LinkItem memuat label dan URL yang sudah dipetakan; RichText merupakan struktur rich text Payload. Nama file relatif terhadap src/components/.

| Folder desain | Komponen / nama file React | Props utama | Ketentuan |
|---|---|---|---|
| Button | ui/Button.tsx — Button | label: string; variant: primary/outline/ghost/wa/light; href?: string; type?: button/submit; size?: default/sm; icon?: ReactNode; disabled?: boolean; onClick?: handler; ariaLabel?: string | Link navigasi atau button sesuai aksi; ag-btn dan variant dipertahankan. Disabled benar-benar tidak dapat diaktifkan, memiliki aria-disabled dan label Coming Soon/Segera Hadir dari pemanggil. |
| ClientStrip | content/ClientStrip.tsx — ClientStrip | clients: ClientView[]; label: string | Item: name, logo?, url?, order. Tepat 11 sesuai seed; logo kosong tampil nama, grayscale 70%, mobile 3 kolom. Pilih baris statis tanpa marquee. |
| ContactForm | forms/ContactForm.tsx — ContactForm | variant: compact/full; locale: Locale; services: ServiceOption[]; labels: FormDictionary; whatsappHref: string; initialServiceId?: string; disabled?: boolean | Compact nama/WA/layanan/pesan; full menambah perusahaan/email. State pending/error/success internal, kirim ke /api/inquiries, label/error terkait dengan kontrol. Data contoh preview tidak menjadi nilai awal. |
| Cover | Tidak dibuat komponen React | Tidak ada props | Dokumentasi desain saja, sesuai keputusan owner #11. |
| FAQ | content/FAQ.tsx — FAQ | items: {id, question, answer: RichText}[]; initialOpenId?: string; sectionId?: string | Native details/summary, ikon plus, keyboard tanpa JS. JSON-LD dibuat terpisah dari item yang benar-benar terlihat. |
| Footer | layout/Footer.tsx — Footer | site: SiteView; services: LinkItem[]; companyLinks: LinkItem[]; regulationLinks: LinkItem[]; logo: MediaRef; labels: FooterDictionary; year: number | Logo on-dark, kontak konsisten, enam layanan urut CMS, lima kategori regulasi. Mobile dua kolom dengan alamat penuh lebar; tanpa newsletter/counter. |
| Header | layout/Header.tsx — Header | locale: Locale; activePath: string; site: SiteView; navigation: NavItem[]; logo: MediaRef; cta: LinkItem; labels: HeaderDictionary; localeUrls: {id, en} | Topbar terpisah dari bagian sticky; dropdown/submenu berasal dari CMS services. Mobile hamburger/panel + toggle, topbar tersembunyi. aria-current, aria-expanded, Escape dan pengembalian fokus. |
| Hero | sections/Hero.tsx — Hero | eyebrow: string; headline: string; highlight?: string; lead: string; image: MediaRef; primaryCta: LinkItem; secondaryCta: LinkItem; stats: StatItem[] | H1 dengan maksimum satu em; ag-hero dan slab diagonal; foto nyata, next/image, tanpa slider. Statistik dari site. |
| LanguageToggle | layout/LanguageToggle.tsx — LanguageToggle | locale: Locale; onLocaleChange: (locale) => void; label: string; variant?: default/on-dark | Pill ag-lang, aria-pressed; callback router client navigation ke pasangan URL, localStorage apegale-language dan html lang. Visual pill tetap 36×30; perluas area sentuh ke ≥44px melalui padding/pseudo-element tanpa mengubah visual atau menumpuk target antar tombol. |
| Moodboard | Tidak dibuat komponen React | Tidak ada props | Dokumentasi desain saja, sesuai keputusan owner #11; reference/ bukan aset produksi. |
| NewsCard | content/NewsCard.tsx — NewsCard | title: string; href: string; categoryLabel: string; date: string; locale: Locale; cover?: MediaRef; readLabel: string | Dipakai posts/regulations; gambar 16:9, fallback maroon-deep, judul maksimum 3 baris; date semantik. Gambar research di preview tidak dibawa ke produksi. |
| PriceTable | content/PriceTable.tsx — PriceTable | rows: PriceRow[]; locale: Locale; labels: PriceDictionary; note: string; updatedAt?: string; sampleLabel?: string | Row: id, name, note?, duration?, priceFrom?, featured. IDR dengan tabular nums, header maroon; overflow hanya wadah tabel. Tidak membuat tanggal palsu; kosong tidak render. sample hanya untuk preview internal. |
| SectionHeading | ui/SectionHeading.tsx — SectionHeading | eyebrow: string; title: string; highlight?: string; intro?: string; align?: left/center; id?: string | H2, maksimum satu em, lebar sesuai token; center hanya section simetris. |
| ServiceCard | content/ServiceCard.tsx — ServiceCard | icon: LucideIconName; title: string; summary: string; href: string; subServices?: LinkItem[]; moreLabel: string | ag-service; grid 3/2/1; hindari nested link bila sublayanan juga link. Enam kartu utama mengikuti order CMS. |
| StatBadge | ui/StatBadge.tsx — StatBadge | items: {value, label}[]; variant?: default/on-brand | Wrapper ag-stats berisi ag-stat; hanya angka resmi 20+ dan 35+ sampai ada sumber baru. |
| Testimonial | content/Testimonial.tsx — Testimonial | quote: string; name: string; role: string; company: string; sampleLabel?: string | ag-quote/blockquote/figcaption; hanya published dengan consent. Grid 3 pada Home; placeholder ag-sample hanya internal, bukan kutipan klien. |
| WhatsAppFloat | layout/WhatsAppFloat.tsx — WhatsAppFloat | phone: string; message: string; label: string; ariaLabel: string | Tautan wa.me dengan pesan ter-encode sesuai halaman dan locale; SVG resmi dari preview, mobile ikon 56px, fixed kanan bawah tanpa menutup kontrol. |

Komponen pelengkap yang diperlukan docs/02: PageHeader.tsx, Breadcrumbs.tsx, RichText.tsx, CtaBanner.tsx, WhySection.tsx, GarisSection.tsx, NetworkSection.tsx, FounderSection.tsx, Organigram.tsx, CategoryFilter.tsx, Pagination.tsx, PdfAttachments.tsx dan EmptyState.tsx. Komposisinya menggunakan pola/token yang ada; tidak memperkenalkan redesign. Cover bukan pengganti PageHeader.

CSS aplikasi berawal dari salinan design/tokens.css dan design/components.css. Nilai mentah yang masih ada pada CSS/inline preview perlu ditokenisasi: tambah ke design/tokens.json lalu regenerasi tokens.css; jangan mengedit hasil generate manual. Hapus Google Fonts @import setelah next/font terhubung, petakan font ke --font-display/--font-body. Warna khusus RGBA, font metrics, ukuran kontrol, focus, dan motion juga memakai token; breakpoint yang membutuhkan literal CSS diturunkan dari sumber token melalui generator, bukan angka ad hoc.

### Animasi dan interaksi lintas halaman

Tambahan arahan pengguna: konten secara keseluruhan dibuat lebih interaktif dengan beberapa animasi. Arahan ini memperluas batas gerak awal design/README.md yang hanya mengizinkan transisi warna/bayangan 200ms dan hover kartu 4px. Penambahan berikut masuk ruang lingkup implementasi tanpa menunggu persetujuan ulang; identitas visual, urutan section, sumber konten, dan aksesibilitas tetap mengikuti spesifikasi. Ini masih rancangan, belum implementasi.

Gerak dibuat halus dan konsisten: satu animasi masuk per kelompok konten, respons langsung saat pengguna berinteraksi, dan tidak mengulang animasi ketika pengguna menggulir kembali. Konten utama hero (H1, lead, CTA dan gambar utama) langsung terlihat saat halaman dimuat agar pembacaan dan LCP tidak tertunda. Bagian bawah halaman mendapat reveal singkat ketika memasuki viewport. Paragraf artikel panjang tetap stabil saat dibaca.

| Area / komponen | Animasi dan pemicu | Perilaku yang harus dipertahankan |
|---|---|---|
| Hero dan header halaman | Aksen diagonal dekoratif bergeser halus sekali saat masuk; heading/lead/CTA utama tetap terlihat sejak awal. | Tidak ada animasi per huruf, perubahan angka 20+/35+, atau penundaan gambar utama. Aksen tidak menutup teks. |
| SectionHeading dan section konten | Fade + translateY pendek saat kelompok pertama kali masuk viewport; heading dan intro bergerak sebagai satu kelompok. | Dipakai pada layanan, Why, tentang/founder, nilai, jaringan, GARIS, testimoni, CTA dan footer. Hindari reveal bertingkat pada parent sekaligus child. |
| ServiceCard, NewsCard, keunggulan, nilai dan testimoni | Reveal berurutan per baris grid; hover naik 4px dan bayangan bertambah. | Maksimum tiga item per kelompok stagger; keyboard memperoleh penanda focus-visible yang jelas. Di mobile reveal per kelompok tanpa stagger panjang. |
| Header, dropdown dan menu mobile | Dropdown fade + perpindahan pendek; panel mobile masuk/keluar dengan transform; bayangan header bertransisi saat sticky aktif. | Ukuran header tetap agar layout tidak meloncat. Menu tertutup tidak dapat menerima fokus; Escape, pengembalian fokus dan aria-expanded mengikuti status interaksi, bukan menunggu animasi selesai. |
| Button, tautan CTA dan WhatsAppFloat | Transisi warna/bayangan; ikon panah bergeser sedikit saat hover/focus-visible; feedback tekan singkat. | Tombol GARIS disabled tidak memiliki efek yang mengisyaratkan bisa diklik. WhatsApp melayang tetap tersedia; tidak berkedip atau berdenyut terus-menerus. |
| LanguageToggle, chip kategori dan pagination | Warna/border status aktif bertransisi singkat; hasil filter baru boleh fade sekali sebagai satu kelompok. | Pergantian locale/filter langsung berjalan tanpa animasi keluar yang menunda navigasi. Fokus tidak hilang, tidak ada fade seluruh halaman saat ganti bahasa. |
| ClientStrip | Transisi grayscale ke warna dan opacity pada hover; focus-visible memberi respons setara pada logo yang memang memiliki tautan. | Sebelas klien tetap dalam urutan sumber; tidak menambahkan tab stop pada logo dekoratif/nonlink dan tidak memakai marquee otomatis. |
| FAQ | Ikon plus berputar saat details terbuka, isi jawaban fade singkat saat dibuka. | details/summary tetap native dan berfungsi tanpa JavaScript; tinggi berubah secara natural, tidak memakai max-height tebakan yang berisiko memotong jawaban. |
| GARIS, jaringan dan organigram | Screenshot/kelompok node muncul halus sekali; titik kota yang sudah valid boleh memberi highlight saat hover/fokus dan label saat tap. | Peta memakai lat/lng 13 kota dari seed yang sudah disediakan owner; label juga dapat diakses lewat daftar kota. Tidak mengarang data, membuat screenshot mengambang terus, atau menganimasikan seluruh garis bagan. |
| PriceTable, artikel dan lampiran PDF | Border/latar baris harga dan tombol unduh memberi feedback hover/fokus; related articles mengikuti animasi kartu. | Isi tabel dan paragraf detail langsung terbaca, tanpa reveal per baris/paragraf. Scroll horizontal tabel tetap natural. |
| ContactForm | Border/fokus kontrol bertransisi, status pending terlihat langsung, panel hasil fade singkat dengan teks dan ikon. | Tidak mengguncang field error. Error/sukses diumumkan melalui live region yang tepat; fokus ke error pertama bila perlu. Status tidak hanya ditunjukkan melalui gerak atau warna. |

#### Komponen dan token gerak yang direncanakan

- src/components/motion/Reveal.tsx: props children, as?, variant (fade/fade-up), delayStep? (0/1/2), className?. Wrapper kecil untuk elemen semantik yang sesuai; dijalankan sekali ketika masuk viewport, tanpa mengubah urutan baca. Jangan membungkus tr dengan div atau membuat struktur HTML invalid.
- src/components/motion/RevealGroup.tsx: props children, as?, stagger? dan className?. Mengatur jeda per baris untuk kumpulan kartu, bukan mengubah seluruh page menjadi client component. Anak berupa konten server yang diteruskan ke wrapper interaktif.
- src/styles/motion.css: aturan gerak bersama, hover/focus/press dan reduced motion. Integrasi menggunakan CSS biasa dan IntersectionObserver untuk reveal; tidak menambah library animasi untuk kebutuhan ini. Listener/observer dilepas setelah reveal dan saat unmount.
- Tambahkan token gerak ke design/tokens.json lalu regenerasi design/tokens.css dan salin hasilnya ke aplikasi saat implementasi. Nilai awal yang direncanakan: --motion-fast 160ms, --motion-base 200ms, --motion-reveal 360ms, --motion-stagger 60ms, --motion-distance 12px, --motion-distance-mobile 8px, --motion-hover-lift 4px, --motion-icon-shift 4px, dan --motion-ease-out cubic-bezier(0.2, 0.8, 0.2, 1). Semua durasi/jarak/easing di aplikasi mengambil token; penyesuaian visual mengubah sumber token.
- Jeda stagger dibatasi dua langkah (maksimum 120ms) per kelompok. Animasi masuk memakai opacity/transform; perubahan layout, blur besar, parallax dan scroll hijacking tidak digunakan. Smooth scroll hanya untuk perpindahan anchor yang diminta pengguna, dengan offset header yang benar.

#### Mobile, aksesibilitas, dan fallback

Pada mobile, jarak reveal lebih pendek dan stagger dimatikan; animasi hover hanya berlaku pada perangkat yang mendukung hover. Area sentuh kontrol minimum 44px dengan padding/pseudo-element, visual pill 36×30 dan tombol kecil 36px tetap sesuai preview; area sentuh tidak saling tumpang tindih. prefers-reduced-motion menonaktifkan reveal, perpindahan, rotasi, stagger dan smooth scroll: semua konten langsung pada posisi akhir, sementara feedback fokus/status tetap tersedia secara instan. Perubahan preferensi saat halaman terbuka juga dihormati.

HTML server dan kondisi tanpa JavaScript menampilkan seluruh konten. Enhancement tidak boleh membuat teks tersembunyi permanen jika JavaScript terlambat/gagal, observer tidak tersedia, atau pengguna menavigasi cepat. Elemen di viewport saat inisialisasi langsung terlihat; elemen yang sedang difokuskan, menjadi target anchor, atau halaman dibuka melalui deep link tidak menunggu reveal. Animasi tidak menghalangi klik, pembaca layar, pencarian dalam halaman, maupun perpindahan bahasa. Dalam mode cetak seluruh konten terlihat tanpa animasi.

#### Kriteria selesai animasi

- Gerak terdistribusi pada seluruh template publik ID/EN melalui komponen bersama; 404 cukup memakai feedback tombol tanpa animasi masuk yang menunda pesan.
- Review pada 1440px dan 390px mencakup sebelum/sesudah animasi, hover, keyboard, menu, filter, FAQ, form dan perpindahan bahasa; konten tidak tumpang tindih atau terpotong selama transisi.
- Uji prefers-reduced-motion, JavaScript dimatikan, deep link, scroll cepat, back/forward dan pergantian locale: semua konten/fokus tetap dapat diakses; reveal tidak berulang pada scroll naik-turun.
- Batas wajib: tanpa library animasi; total JavaScript tambahan khusus motion ≤3 KB gzip (seluruh helper/wrapper motion digabung, dependensi tambahan ikut dihitung). Ukur dari output production build dan simpan hasil pada QA; Lighthouse tetap ≥90.
- Animasi tidak menyebabkan layout shift, overflow, tambahan jeda H1/LCP, atau menurunkan hasil di bawah target Lighthouse dalam docs/04. Matikan efek dekoratif yang mengganggu target tersebut.

## 4. Pemetaan template docs/02 ke route Next.js

Semua file berikut relatif terhadap src/app/(public)/. Setiap pasangan memakai satu template React bersama di src/components/templates/ dan parameter locale. Price List adalah section Layanan/detail, bukan route baru.

| Template docs/02 | URL ID | URL EN | File route ID ↔ EN | Template/data |
|---|---|---|---|---|
| Home | / | /en | (id)/page.tsx ↔ en/page.tsx | HomePage; home, site, services, clients, garis, testimonials, faqs, posts, regulations. |
| Tentang Kami | /tentang-kami | /en/about | (id)/tentang-kami/page.tsx ↔ en/about/page.tsx | AboutPage; about + founder/why/network dari home. |
| Layanan + Price List | /layanan | /en/services | (id)/layanan/page.tsx ↔ en/services/page.tsx | ServicesPage; enam services parent kosong; harga featured dari services published. |
| Detail Layanan | /layanan/[slug] | /en/services/[slug] | (id)/layanan/[slug]/page.tsx ↔ en/services/[slug]/page.tsx | ServiceDetailPage; service, parent/children, priceItems, FAQ terkait. |
| GARIS | /garis | /en/garis | (id)/garis/page.tsx ↔ en/garis/page.tsx | GarisPage; garis + kontak site. |
| Regulasi (list) | /regulasi | /en/regulations | (id)/regulasi/page.tsx ↔ en/regulations/page.tsx | ArticleListingPage kind=regulations; filter kategori, sembilan per halaman. |
| Detail Regulasi | /regulasi/[slug] | /en/regulations/[slug] | (id)/regulasi/[slug]/page.tsx ↔ en/regulations/[slug]/page.tsx | ArticleDetailPage kind=regulation; isi, PDF, related. |
| News (list) | /news | /en/news | (id)/news/page.tsx ↔ en/news/page.tsx | ArticleListingPage kind=posts; kategori news/panduan, sembilan per halaman. |
| Detail Artikel | /news/[slug] | /en/news/[slug] | (id)/news/[slug]/page.tsx ↔ en/news/[slug]/page.tsx | ArticleDetailPage kind=post; isi dan related. |
| Hubungi Kami | /hubungi-kami | /en/contact | (id)/hubungi-kami/page.tsx ↔ en/contact/page.tsx | ContactPage; site, services, FAQ, form ke inquiries. |
| 404 | URL ID yang tidak ditemukan | URL /en yang tidak ditemukan | not-found.tsx ↔ en/not-found.tsx + cakupan unknown path masing-masing locale | NotFoundPage; pesan lokal, link Layanan dan WhatsApp; status HTTP 404. |

Tidak menambahkan prefix /id. Enam layanan utama memakai slug broad-expatriate-hosting, expatriate-formalities, manpower-supply, legalitas-perusahaan, airport-escort, hr-system-consulting dalam urutan tersebut. Anak Expatriate Formalities: kitas-kitap, visa-paspor, all-in-one-solutions, kitas-lansia; anak Visa & Paspor: vitas, multiple-business-visa, visa-kunjungan, visa-tinggal-terbatas-penyatuan-keluarga, visa-on-arrival, visa-pelajar. Seluruh 16 entri memakai route detail datar di atas, tidak menambahkan parent ke URL. Hanya title Legalitas Perusahaan menjadi Company Legalities; slug tetap.

Menu Tentang Kami menuju anchor #salam, #profil, #founder, #organigram pada satu halaman kedua locale. GARIS menyediakan #coba-gratis untuk redirect lama. Toggle memetakan segmen statis, mempertahankan slug, anchor dan query valid; kategori regulasi memakai kategori sesuai redirect lama. URL eksplisit menjadi sumber locale sehingga /en tidak dialihkan oleh preferensi tersimpan.

Shell publik: Header → konten → satu CTA banner → Footer → WhatsAppFloat. Pada Home, banner menjadi bagian section form terakhir; Hubungi Kami tidak memiliki banner tambahan. Section opsional mempertimbangkan sectionsVisible dan ketersediaan published, bukan sekadar checkbox. Empty list menggunakan empty state; detail slug tidak ada/draft pada akses publik menghasilkan 404.

Urutan isi dipertahankan: Home memiliki 11 section sesuai docs/02; Tentang Kami dari salam/profil/visi-misi hingga organigram/jaringan; Detail Layanan dari breadcrumb hingga isi, sublayanan, persyaratan, harga, FAQ, layanan lain; artikel dari breadcrumb hingga isi/PDF/related. Data belum tersedia tidak diganti dengan narasi baru.

## 5. Urutan 10 langkah Working agreement dan kriteria selesai

Urutan berikut tidak diubah. Pada setiap langkah aplikasi tetap dapat dijalankan; dev, build, lint, typecheck dan seed dipertahankan. build/lint/typecheck harus lulus untuk perubahan tahap tersebut. Setiap halaman yang sudah tersedia diperiksa pada 1440px dan 390px sebelum dinyatakan selesai. Dependensi konten klien yang belum terpenuhi dicatat sebagai pending, bukan dilaporkan sudah selesai.

| Langkah | Pekerjaan | Kriteria selesai |
|---|---|---|
| 1. Project + Payload + collections/globals + seed script | Scaffold blank Next/Payload, pin versi, PostgreSQL dengan satu titik pemilihan adapter, upload lokal, sembilan collections dan lima globals (site, home, about, garis, ui), termasuk field tambahan owner. Localization ID/EN, users/roles, draft/publish, draft preview, normalisasi delapan seed. | dev menyala; /admin dapat login dalam bahasa Indonesia; API publik tidak membocorkan draft/inquiries/users; editor tidak dapat menulis site/users. Semua JSON mempunyai tujuan, aset diunggah dengan alt, relasi benar; seed dijalankan dua kali tanpa perubahan jumlah/duplikat. Data placeholder atau migrasi belum siap tidak dipublish. Scripts dev/build/lint/typecheck/seed tersedia; jalankan migrasi dan seed dua kali, laporkan jumlah dokumen per koleksi per locale, lalu build/lint/typecheck. PostgreSQL default; SQLite dapat dipilih untuk dev lokal melalui env. Tidak ada halaman frontend pada tahap ini. |
| 2. Layout shell: Header, Footer, WhatsAppFloat, LanguageToggle | Hubungkan token/font; bangun shell, navigasi CMS, dropdown tiga tingkat yang diperlukan, hamburger, kontak, pasangan route dan CTA. | Enam layanan urut, toggle setara tanpa reload, localStorage dan html lang benar pada SSR/navigasi; topbar ikut scroll dan header sticky. Menu keyboard/Escape/fokus berfungsi; mobile logo 32px, desktop 40px, toggle tetap terlihat. 11 klien dan fakta tidak ditambah/diganti. Review visual shell kedua lebar lulus. |
| 3. Home | Susun Hero → ClientStrip → enam layanan → empat keunggulan → GARIS → jaringan → tentang/founder → testimoni → FAQ → tiga News/Regulasi terbaru → CTA/form ringkas. | Susunan dan sumber data benar; flags + filter published berfungsi; section kosong tersembunyi; 11 nama klien termasuk fallback teks, 20+/35+ konsisten. Kutipan placeholder tidak muncul. Form ringkas pada tahap ini presentasi disabled berlabel dan WhatsApp aktif; aktivasi kirim menjadi dependensi langkah 8. Peta memakai koordinat seed; fitur GARIS kosong sengaja disembunyikan; kutipan founder menunggu persetujuan. |
| 4. Layanan + Detail Layanan + Price List | Index enam utama, template untuk 16 slug, breadcrumb/parent/children, rich text hasil migrasi, persyaratan opsional, FAQ terkait, layanan lain, CTA WA sesuai layanan. | Pasangan route dan hierarki benar; published tampil, draft ditolak publik; daftar harga featured merupakan agregasi services.priceItems dan detail hanya harga layanan terkait. Array kosong menyembunyikan section; priceFrom kosong pada baris asli menghasilkan Hubungi kami. Catatan PNBP/tanggal dari data, scroll tabel terlokalisir. Isi visa lama dari legacy/ tetap draft sampai diverifikasi; pada langkah 1 seluruh body source/note dibiarkan kosong. |
| 5. Tentang Kami | Salam, profil, visi/misi, nilai, keunggulan, founder, organigram, jaringan, CTA; migrasi sumber ID dan terjemahan EN. | Semua empat anchor menu/redirect dapat dituju; foto dan quote tidak dikarang, organigram sesuai data terkonfirmasi, nama/jabatan editable CMS. Konten resmi seed dan organigram boleh published di kedua bahasa, seluruh nama founder Deny Yandi Imran; greeting/profile dimigrasi pada langkah 5 dan kutipan tetap menunggu persetujuan. |
| 6. GARIS | Hero produk, tiga varian sesuai seed, galeri screenshot, features jika tersedia, Login/Coba Gratis/WhatsApp, anchor coba-gratis. | enabled=false menonaktifkan kedua tombol dengan label ID/EN; tidak ada link kosong/mati yang bisa diklik. Perubahan enabled dan URL valid di CMS mengaktifkannya tanpa deploy; URL kosong tetap tidak dapat diklik. Tidak membangun aplikasi/login GARIS. Dua screenshot dari garis.gallery; features kosong disembunyikan sesuai keputusan owner. |
| 7. Regulasi + News (list/detail) | Listing/filter/pagination sembilan per halaman; detail/related, impor regulasi dan PDF ke media, cover fallback. | Lima kategori regulasi serta news/panduan tepat; filter/pagination dan link detail bekerja di ID/EN. PDF dapat diunduh dari media dan mempunyai map URL lama. Home memilih tiga terbaru dari gabungan published. Empty state dan 404 benar; berita Covid 2021 tidak diimpor; konten legal menunggu verifikasi bila belum valid. |
| 8. Hubungi Kami + form → email | Halaman kontak, peta berupa link bila valid, FAQ, form lengkap dan aktivasi compact Home. Handler validasi server, honeypot/rate-limit, simpan inquiry lalu email via Payload SMTP dengan emailStatus terpisah. | Submit kedua varian yang valid tersimpan dan email diterima di site.email pada uji SMTP; data invalid ditolak dengan error lokal yang terhubung, status pending/sukses/gagal jelas, honeypot dan rate-limit diuji. Akses baca inquiries admin saja, pengiriman ulang tidak membuat duplikat. Kegagalan SMTP tidak menghilangkan inquiry atau mengklaim email terkirim. Jangan nyatakan integrasi selesai bila SMTP belum tersedia. |
| 9. SEO, redirects, sitemap | Metadata CMS kedua locale; canonical/hreflang id/en/x-default; Organization, Service, FAQPage, Article, BreadcrumbList; sitemap/robots, favicon; seluruh map redirect docs/02. | Metadata dapat ditelusuri ke CMS; sitemap hanya halaman published dan kedua locale; draft preview tidak diindeks. Semua redirect memakai statusCode: 301 di redirects(), bukan permanent: true; uji script membuktikan HTTP 301 tanpa loop, query/anchor benar, map PDF spesifik tersedia. Periksa sitemap lama sebelum go-live dan uji tiap URL lama, termasuk normalisasi /news/ dan /hubungi-kami/. Metadata default menutupi field opsional kosong tanpa mengarang fakta. |
| 10. QA terhadap docs/04-acceptance.md | Audit visual/fungsional/CMS/bahasa/a11y/SEO/performa; dokumentasi build/start, migrasi DB, media persisten, backup dan deploy hosting. | Semua checklist docs/04 terpenuhi atau blocker nyata tercatat terbuka; jangan mengklaim selesai bila blocker belum beres. Tidak ada page overflow 360–1920px, nilai styling berasal dari tokens, next/image responsif WebP/AVIF, next/font aktif. Lighthouse mobile ≥90 Performance/Accessibility/Best Practices/SEO pada Home, Layanan, Detail Layanan. Keyboard, focus, touch target, reduced motion, draft preview, rerun seed, form kedua varian, locale detail/404 dan semua redirect teruji. README deploy dan .env.example lengkap termasuk DATABASE_URI, PAYLOAD_SECRET, NEXT_PUBLIC_SITE_URL, SMTP_*. Go-live menunggu akses hosting/domain serta penutupan blocker konten yang relevan. |

### Integrasi animasi dalam urutan kerja

Urutan sepuluh langkah tetap. Langkah 2 menyiapkan token/motion.css, wrapper reveal, serta interaksi shell; langkah 3 menerapkannya pada Home. Langkah 4–8 memakai pola yang sama untuk halaman layanan, Tentang Kami, GARIS, artikel dan form. Kriteria selesai setiap halaman mencakup animasi normal, reduced motion, keyboard dan fallback tanpa JavaScript. Langkah 9 memastikan konten/metadata tidak bergantung pada animasi; langkah 10 memverifikasi seluruh kriteria animasi di bagian 3 bersama checklist docs/04.

## 6. Keputusan owner dan hal yang masih terbuka

Keputusan #10–#26 pada docs/OPEN-QUESTIONS.md sudah berlaku dan tidak ditanyakan ulang. Asumsi lama dihapus dari rencana, diganti ketentuan implementasi di atas. Ringkasan keputusan:

- Sumber migrasi tersedia di legacy/: 33 HTML, img/, company-profile-2026.pdf dan README-rebuild-lama.md. Langkah 1 hanya menyiapkan CMS/seed; body.source/note tidak menjadi konten dan dibiarkan kosong. Migrasi teks tetap langkah 4/5/7.
- Cover dan Moodboard hanya dokumentasi, tidak dibuat komponen React. Harga, normalisasi seed, global ui, intro opsional, gallery, emailStatus, enReviewed, seedKey dan koordinat kota mengikuti kontrak field di bagian 2.
- Empat FAQ featured cukup. GARIS features kosong disembunyikan. mapsUrl dan lead/SEO/FAQ terbaru sudah tersedia; Why Digital Monitoring dipertahankan. Organigram boleh published, nama lengkap founder seragam.
- Visual pill 36×30 dan tombol kecil 36px dipertahankan dengan area sentuh ≥44px. URL menentukan locale, localStorage hanya preferensi. Inquiry disimpan sebelum email; emailStatus terpisah. Latest content berdasarkan posts.publishedAt / regulations.issuedAt, hanya published.
- Home memiliki satu CTA/form; pengiriman aktif pada langkah 8. Redirect menggunakan statusCode: 301 dan diuji script. Motion tanpa library, total tambahan ≤3 KB gzip, Lighthouse ≥90, reduced motion dan fallback tetap wajib; brand book disinkronkan.

Yang masih menunggu klien adalah pertanyaan #1–#9: kesiapan hosting/domain, testimoni, daftar harga, foto resolusi tinggi/lisensi, logo final, review EN, verifikasi konten visa/regulasi lama, sosial selain Instagram dan kutipan founder. Ini tidak menghalangi setup CMS. Harga tanpa baris menyembunyikan section; Hubungi kami hanya untuk baris nyata dengan priceFrom kosong. Tidak ada pertanyaan baru yang diperlukan untuk memulai langkah 1.

# Open questions (menunggu klien)

| # | Pertanyaan | Dampak bila belum dijawab |
|---|---|---|
| 1 | Hosting klien: apakah mendukung Node.js + PostgreSQL? Akses cPanel/VPS? | Deploy tertunda; siapkan opsi SQLite |
| 2 | Testimoni asli (min. 3: nama, jabatan, perusahaan, izin tampil) | Section Testimoni disembunyikan |
| 3 | Price list terbaru per layanan | Kolom harga "Hubungi kami" |
| 4 | Foto resolusi tinggi kantor, tim, founder; lisensi foto cover compro | Pakai aset sementara di `design/assets` |
| 5 | Logo SVG Apegale & GARIS; SVG 6 logo klien (KSB, AdaKami, unicharm, Lalamove, Apple, Taiheiyo Cement) | Logo tampil sebagai teks nama |
| 6 | Review terjemahan EN | EN tetap tayang, ditandai perlu review di CMS |
| 7 | Kode & durasi visa di halaman lama (2021) masih berlaku? Sejak 2023 ada penamaan visa baru (mis. C1, C2, E23) | Detail layanan visa perlu dicek sebelum publish |
| 8 | Akun sosial resmi selain Instagram | Hanya ikon Instagram |
| 9 | Kutipan sambutan founder yang disetujui | Section founder tanpa kutipan |

## Tambahan dari perencanaan — 08 Oktober 2026

Pilihan sementara di bawah merupakan asumsi implementasi yang konservatif, bukan keputusan bisnis baru. Nomor 1–9 tetap berlaku; pertanyaan baru juga dicantumkan di PLAN.md.

| # | Pertanyaan / ketidakjelasan | Asumsi atau tindakan sementara |
|---|---|---|
| 10 | Di mana lokasi 33 HTML lama dan PDF Company Profile 2026 yang dirujuk sebagai ../ oleh docs/01–02 dan seed? File tersebut tidak ada di folder induk web saat pemeriksaan. | Migrasi isi dan PDF menunggu sumber yang benar; body.source hanya metadata migrasi, tidak ditampilkan sebagai konten. Konten belum lengkap tetap draft. |
| 11 | Cover dan Moodboard tidak memiliki README.md. Apakah keduanya hanya artefak dokumentasi desain? | Asumsi: keduanya referensi internal. Pemetaan React dicatat sebagai opsional internal; tidak membuat halaman publik atau memakai gambar reference/ dalam produksi. |
| 12 | Price List di docs/02 menyebut priceItems, sedangkan docs/03 menyimpannya sebagai array services.priceItems. Di mana catatan dan tanggal pembaruan harga disimpan? | Gunakan array dalam services; index menggabungkan baris featured dari layanan published. Usulkan priceNote lokal dan priceUpdatedAt per layanan. Tabel kosong disembunyikan; Hubungi kami hanya untuk baris nyata dengan priceFrom kosong. |
| 13 | Apakah normalisasi seed berikut disetujui: parent layanan berupa slug menjadi relasi, organigram.parent berupa nama menjadi parentIndex, jawaban FAQ berupa string menjadi rich text, serta kunci stabil bagi FAQ/media? | Transformasi dilakukan oleh seed tanpa mengubah fakta; tambahkan seedKey unik nonlokal untuk FAQ/media agar rerun tidak menggandakan atau bergantung pada teks yang bisa diedit. Field _source/_notes dan body.source tidak masuk teks publik. |
| 14 | Bagaimana melengkapi field yang dibutuhkan template tetapi belum ada dalam schema/seed: galeri GARIS, 3 features, logo produk, intro halaman, SEO per halaman, label UI tambahan, jam kerja, dan alt media ID/EN? | Usulkan field minimal pada globals terkait, termasuk gallery GARIS dan global ui untuk ui-dictionary. Impor aset/teks yang tersedia saja; features tidak dikarang, jam kerja dan field opsional kosong disembunyikan. Metadata sementara memakai seoDefault. |
| 15 | Sumber peta dan posisi x/y untuk 13 kota belum disertakan; mapsUrl kantor juga belum diisi. Siapa yang memvalidasi koordinat dan tautan kantor? | Pertahankan 13 nama kota seed dan klaim 35+ kota. Tampilkan daftar kota sementara; jangan menebak titik peta atau pin kantor. Peta/tautan tampil setelah sumber valid tersedia. |
| 16 | Apakah 4 FAQ featured dari total 5 seed cukup untuk Home sementara target docs/02 adalah 5–6? Bagaimana relasi FAQ ke layanan ditetapkan? | Tampilkan 4 featured yang tersedia; jangan membuat FAQ baru atau mengubah featured diam-diam. Detail menampilkan FAQ berelasi saja; index boleh memakai kategori layanan. |
| 17 | Ukuran toggle 36×30 dan tombol kecil 36px bertentangan dengan hard rule target sentuh 44px; components.css juga masih memuat nilai mentah. Apakah aturan aksesibilitas/tokens menjadi prioritas? | Ya sebagai asumsi implementasi: target interaksi minimum 44px, bentuk pill dipertahankan; tambah token yang kurang dalam tokens.json, regenerasi tokens.css, lalu gunakan var pada CSS aplikasi. Catat deviasi terukur dari preview. |
| 18 | Bagaimana perilaku bahasa saat URL eksplisit berbeda dari localStorage, termasuk query kategori/pagination dan anchor? | URL menentukan locale dan html lang; localStorage menyimpan preferensi tanpa memaksa redirect kunjungan eksplisit. Toggle client-side memetakan halaman setara, mempertahankan slug, query yang valid, dan anchor. ID tetap default. |
| 19 | Field wajib form lengkap belum ditetapkan, sedangkan form Home tidak memiliki email/perusahaan. SMTP pengirim dan penanganan gagal kirim juga belum tersedia. | Asumsi: nama, WhatsApp, layanan, pesan wajib; email wajib hanya form lengkap, perusahaan opsional. Server memvalidasi varian. Simpan inquiry sebelum notifikasi; usulkan status pengiriman terpisah dan cegah submit ulang membuat duplikat. Keberhasilan email harus diuji dengan SMTP nyata sebelum selesai langkah 8. |
| 20 | Apakah data lama terkait visa/regulasi, FAQ GARIS, serta klaim tracking real time di hero tetap boleh dipublikasikan ketika Login/Coba Gratis GARIS disabled? | Tidak mengubah klaim sendiri. Tandai kebutuhan review bersama pertanyaan 7; konten legal yang belum diverifikasi tetap draft, tombol produk tetap disabled. Jangan menyebut regulasi 2023 sebagai regulasi terbaru tanpa verifikasi saat migrasi. |
| 21 | Bagaimana urutan terbaru gabungan News/Regulasi, kategori News, dan isi awal regulasi yang belum memiliki seed? | Asumsi: gabungkan posts.publishedAt dan regulations.issuedAt menurun, hanya published; kategori posts news/panduan, kategori regulasi mengikuti docs/03. Tanpa konten: empty state listing, section terbaru Home tersembunyi; berita Covid 2021 tidak dimigrasi. |
| 22 | Apakah editor boleh mengelola inquiries dan seluruh global selain site? Bagaimana draft preview globals serta field EN yang belum direview ditandai? | Asumsi: inquiries hanya admin; editor mengelola konten biasa tetapi tidak site/users. Rencanakan akses field dan preview berautentikasi, serta penanda review EN di CMS. Draft tidak bocor melalui API publik, relasi, pencarian, atau sitemap. |
| 23 | Apakah hierarki organigram hasil pembacaan bagan dan penulisan Deny Yandi I. vs Deny Yandi Imran sudah dikonfirmasi? | Pertahankan nama dari sumber masing-masing, jangan menyamakan identitas atau mengubah garis atasan sendiri. Hierarki yang belum divalidasi tetap draft; kebutuhan konfirmasi ini sudah ditandai _source about.json. |
| 24 | Apakah CTA banner Home cukup satu yang menyatu dengan form singkat, dan form boleh aktif baru di langkah 8 sesuai Working agreement? | Gunakan satu CTA banner/form di akhir Home; jangan gandakan banner global. Di langkah 3 form masih presentasi/disabled berlabel, CTA WhatsApp aktif; Home dinyatakan selesai end-to-end setelah langkah 8. |
| 25 | docs/02 meminta HTTP 301 melalui next.config redirects; bagaimana memastikan status tepat dan normalisasi trailing slash tidak membuat loop? | Saat implementasi, verifikasi API versi Next.js terpasang dan gunakan konfigurasi yang menghasilkan 301 sebenarnya, bukan sekadar permanent yang mungkin 308. Audit seluruh URL lama dan map PDF eksplisit; cek status serta tujuan/anchor/query sebelum go-live. |
| 26 | Tambahan arahan pengguna: tambahkan beberapa animasi agar keseluruhan konten lebih interaktif. | Sudah diarahkan pengguna, bukan pertanyaan yang menunggu persetujuan. Batas gerak awal design/README.md diperluas menjadi reveal section/grid dan feedback interaksi pada seluruh template sesuai bagian animasi PLAN.md. Nilai awal gerak merupakan keputusan implementasi yang dapat dituning; reduced motion, fallback konten terlihat, performa dan token tetap wajib. |

## Keputusan owner untuk #10–#26 (08 Okt 2026) — berlaku, jangan ditanyakan ulang

| # | Keputusan |
|---|---|
| 10 | **Selesai.** Sumber lama sudah ada di dalam workspace: `legacy/*.html` (33 halaman), `legacy/img/`, `legacy/company-profile-2026.pdf`, `legacy/README-rebuild-lama.md`. Semua rujukan `../` di docs & seed sudah diganti `legacy/`. |
| 11 | Ya, Cover & Moodboard hanya dokumentasi desain. **Jangan** dibuat komponen React. |
| 12 | Setuju: tambah `priceNote` (localized) dan `priceUpdatedAt` (date) per layanan. Index Layanan menggabungkan baris `featured`. Tanpa data → section tersembunyi. |
| 13 | Setuju semua normalisasi seed + `seedKey` stabil untuk FAQ/media. |
| 14 | Setuju: global `ui` dari `ui-dictionary.json`; `garis.gallery` (upload) diisi dua screenshot; `garis.features` dibiarkan kosong (section fitur disembunyikan, cukup 3 varian). Intro halaman statis: field `intro` (localized) opsional per halaman, boleh kosong. Alt media ID/EN: tulis alt deskriptif berdasarkan isi gambar (bukan klaim bisnis). Jam kerja: tidak ditampilkan. |
| 15 | Koordinat kota sudah diisi di `content/seed/home.json` (`lat`/`lng`, data geografis publik) — pakai untuk peta SVG. `site.mapsUrl` sudah diisi (link pencarian Google Maps Ciputra World 2). |
| 16 | 4 FAQ featured cukup. Jangan menambah FAQ. |
| 17 | Pertahankan **tampilan** sesuai preview (pill 36×30, tombol kecil 36px), tapi perbesar **area sentuh** ke ≥44px lewat padding/pseudo-element tanpa mengubah ukuran visual. Penambahan token yang kurang ke `tokens.json` disetujui. |
| 18 | Setuju: URL menentukan locale; localStorage hanya preferensi, tidak memaksa redirect. |
| 19 | Setuju: wajib = nama, WhatsApp, layanan, pesan (kedua varian); email wajib di form lengkap; perusahaan opsional. Inquiry disimpan dulu, status email terpisah (`emailStatus`). |
| 20 | **Sudah diperbaiki di seed:** hero lead, SEO default, dan FAQ GARIS tidak lagi mengklaim pelacakan real time lewat GARIS. Teks "Digital Monitoring" di Why tetap (kutipan compro). Konten visa/regulasi lama tetap **draft** sampai diverifikasi. |
| 21 | Setuju. |
| 22 | Setuju: inquiries hanya admin; tambah checkbox `enReviewed` pada koleksi berkonten dan tampilkan kolomnya di list admin. |
| 23 | Organigram dari Company Profile 2026 = sumber resmi klien → boleh **published**. Pakai nama lengkap **Deny Yandi Imran** di semua tempat (founder & organigram). |
| 24 | Setuju. |
| 25 | Pakai `statusCode: 301` di `redirects()` (bukan `permanent: true` yang menghasilkan 308) dan uji dengan script. |
| 26 | Animasi disetujui sesuai PLAN.md bagian 3, dengan batas: tanpa library animasi, total JS tambahan untuk motion ≤ 3 KB gzip, dan Lighthouse tetap ≥ 90. Perbarui bagian "Bentuk & tata letak → Gerak" di `design/README.md` agar sinkron. |

## Tambahan langkah 5 (09 Okt 2026)

| # | Pertanyaan | Tindakan sementara |
|---|---|---|
| 27 | Sambutan CEO di halaman Tentang Kami diambil dari `legacy/salam-dari-kami.html` (2021). Paragraf tentang pandemi Covid-19 dan tagar dihapus, sisanya dirapikan tanpa klaim baru. Mohon persetujuan Pak Deny atas teks final (`content/seed/about-content.json`). | Tayang dengan teks yang dirapikan; ganti lewat CMS atau JSON + `npm run content:about` bila ada revisi. |
| 28 | Legacy menyebut tiga founder (Deny Yandy, Roy Darsana, Alwind Fattah; compro 2021), sedangkan compro 2026 hanya mencantumkan Deny Yandi I. sebagai Direktur. | Halaman hanya menampilkan Deny Yandi Imran (Founder & CEO). Tambahkan founder lain bila klien mengonfirmasi. |

## Tambahan langkah 6–9 (09 Okt 2026)

| # | Pertanyaan | Tindakan sementara |
|---|---|---|
| 29 | Sitemap WordPress lama memuat 3 posting spam yang bukan konten Ape Gale (`/airbrush-kits-…`, `/airbrush-art-…`) beserta tag-nya — tanda situs lama pernah disusupi. Perlu dicek di hosting lama dan dihapus dari Google Search Console. | URL spam, `/tag/*`, `/author/*` sengaja **tidak** di-redirect (404). |
| 30 | Ke-44 regulasi tidak punya tanggal terbit (`issuedAt` kosong). Tanggal dipakai untuk urutan daftar dan `datePublished` di schema Article. | Urutan memakai tanggal input; isi tanggal saat verifikasi sebelum publish. |
| 31 | Domain produksi final: `https://apegale.com` atau `https://www.apegale.com`? Dipakai untuk canonical, hreflang, sitemap, OG. | `NEXT_PUBLIC_SITE_URL` wajib diisi **sebelum** `npm run build`. |
| 32 | URL lama untuk 9 layanan yang masih draft (mis. `/vitas/`) diarahkan ke halaman layanan baru; selama draft, halaman itu mengalihkan sementara (307) ke induk terdekat yang sudah publish (Expatriate Formalities). | Otomatis berubah saat layanan dipublish; tidak perlu deploy. |
| 33 | Setelah go-live: verifikasi kepemilikan domain di Google Search Console & Bing, kirim `sitemap.xml`. Siapa yang memegang akun Google klien? | Belum dilakukan. |
| 34 | Rate limit form membaca IP dari `x-forwarded-for`; di produksi aplikasi harus di belakang reverse proxy yang menimpa header itu. | Dicatat di panduan deploy (langkah 10). |

## Tambahan revisi copy (09 Okt 2026) — copy mengikuti apegale.com lama apa adanya

| # | Pertanyaan | Tindakan sementara |
|---|---|---|
| 35 | Keputusan owner: seluruh copy memakai teks situs lama tanpa dikurangi/ditambah. Beberapa bagian **tidak ada di situs lama** dan berasal dari Company Profile 2026 atau perencanaan: 4 keunggulan "Mengapa Ape Gale", angka 20+/35+, 11 logo klien, peta jaringan, FAQ (5 pertanyaan), status "Segera Hadir" GARIS, nama/jabatan founder & organigram 2026. Dipertahankan atau dihapus? | Dipertahankan (sumber resmi klien), menunggu keputusan. |
| 36 | Teks situs lama (2021) memuat paragraf pandemi Covid-19 dan tagar di Salam dari Kami, serta kode visa lama (312/212/211/C317/316, B211A–D). Ditampilkan apa adanya sesuai keputusan; halaman visa tetap draft sampai diverifikasi (#7). | Tampil apa adanya. |
| 37 | Situs lama hanya berbahasa Indonesia. Versi EN adalah terjemahan setia dari teks tersebut; perlu review klien (#6). | EN tayang, ditandai belum direview. |

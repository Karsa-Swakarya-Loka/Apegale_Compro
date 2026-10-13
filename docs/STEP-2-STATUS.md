# Status langkah 2 — 09 Oktober 2026

**Selesai. Langkah 3 (Home) boleh dimulai.**

## Yang dibangun

| Area | File |
|---|---|
| Token & gaya | `scripts/build-tokens.mjs` (`npm run tokens`) membuat `design/tokens.css` + `src/styles/tokens.css` dari `design/tokens.json`. Token baru: `transition` (motion-*), `size` (touch-target, header-height, logo-height, wa-size, dropdown-width), `zIndex`, `opacity`. `src/styles/components.css` = salinan `design/components.css` tanpa `@import` Google Fonts. `src/styles/shell.css` (header, nav, menu mobile, CTA banner, footer, WA, 404) dan `src/styles/motion.css` (dropdown, panel, panah tombol, reveal, reduced motion). |
| Font | `next/font/google` Jost (500/600/700) + Source Sans 3 (400/600/700, italic) → `--font-display` / `--font-body`. |
| Routing i18n | `src/proxy.ts` (konvensi Next 16, pengganti middleware) mengirim `x-locale` ke root layout untuk `<html lang>` awal. `src/i18n/routes.ts`: tabel rute ID↔EN, `href()`, `switchLocalePath()` (pertahankan slug, query, hash). `src/i18n/messages.ts`: teks shell tanpa field CMS (ID+EN). `src/i18n/LanguageSync.tsx`: sinkron `<html lang>` saat navigasi klien. |
| Struktur route | `app/(public)/layout.tsx` = satu root layout publik (html, font). `app/(public)/(id)/layout.tsx` dan `app/(public)/en/layout.tsx` merender `SiteShell` per bahasa, sehingga header/footer ikut berganti saat toggle tanpa full reload. `[...rest]/page.tsx` + `not-found.tsx` per bahasa → 404 dwibahasa di dalam shell. |
| Data CMS | `src/lib/cms.ts`: globals `site`/`ui`/`home` dibaca versi published di server; `getMenuServices()` hanya layanan **published** + `showInMenu`, tersusun pohon sesuai `order` (akses publik berlaku). |
| Komponen | `layout/Header` (topbar + bar sticky), `layout/HeaderNav` (dropdown 3 tingkat, menu mobile), `layout/LanguageToggle`, `layout/Footer`, `layout/WhatsAppFloat`, `layout/CtaBanner`, `layout/SiteShell`, `ui/Button`, `ui/SectionHeading`, `ui/BrandIcons` (WhatsApp, Instagram — lucide-react 1.x tidak menyertakan ikon brand), `motion/Reveal`, `templates/HomePlaceholder` (sementara sampai langkah 3), `templates/NotFoundView`. |
| Dependensi baru | `lucide-react@1.53.0`, `server-only@0.0.1` (dipin). |

## Hasil pemeriksaan

- `npm run typecheck` lulus · `npm run lint` lulus · `npm run build` lulus (route `/`, `/en`, `/[...rest]`, `/en/[...rest]`, admin, api, proxy).
- Uji interaksi otomatis (Playwright, server produksi, salinan DB dengan layanan menu dipublish): **43/43 lulus**:
  - Tanpa scroll horizontal di 360, 390, 768, 1024, 1440, 1920px untuk `/`, `/en`, 404.
  - Dropdown: buka via keyboard, level 3 Expatriate Formalities (4 item), Escape menutup + fokus kembali.
  - Tab pertama = link "Lewati ke konten".
  - Toggle ID↔EN: pindah ke halaman setara, **tanpa full reload**, `<html lang>` berubah, preferensi tersimpan `apegale-language`, label menu berganti bahasa.
  - Tombol toggle visual 36×30 dengan area sentuh 44×44 (keputusan #17).
  - Mobile: toggle tetap terlihat, topbar disembunyikan, logo 32px, menu panel terbuka/tertutup, submenu, Escape + fokus kembali ke tombol menu, scroll halaman terkunci/terbuka.
  - Status 404 untuk `/layanan/x` dan `/en/xyz`.
- Review visual 1440px dan 390px: header, dropdown, menu mobile, CTA banner, footer, tombol WA sesuai `design/components`.

## Catatan

- Di database dev semua layanan masih **draft**, jadi menu Layanan dan kolom Layanan di footer kosong sampai layanan dipublish (sesuai aturan). Review visual memakai salinan DB sementara (sudah dihapus).
- Halaman Tentang Kami, Layanan, GARIS, Regulasi, News, Hubungi Kami masih 404 sampai langkahnya dikerjakan.
- `HomePlaceholder` hanya menampilkan teks hero dari CMS + CTA banner; diganti Home lengkap di langkah 3.
- Breakpoint di CSS ditulis literal (767px, 1099px) karena media query tidak bisa membaca custom property. Menu desktop tampil mulai 1100px agar 7 item + CTA tidak berdesakan.

# LanguageToggle

Saklar bahasa ID | EN berbentuk pill di kanan header, meniru perilaku nexora-technology.id.

- Wadah `radius-pill`, padding `space-1`, jarak `space-1`; tombol 36×30px, teks `caption` (12px, 700).
- Aktif: latar `brand-tint`, teks `brand-text`. Non-aktif: teks `ink-muted`. Transisi warna 200ms.
- Klik mengganti seluruh teks halaman **tanpa reload**, menyimpan pilihan di `localStorage` (`apegale-language`), default **ID**.
- Tambahan dari nexora: ubah juga `<html lang>`, dan sediakan URL versi EN (mis. `/en/…`) dengan `hreflang` agar halaman Inggris terindeks Google.
- Varian `ag-lang--on-dark` untuk topbar/hero gelap. Di mobile toggle tetap terlihat di header, di sebelah tombol menu.
- Konsumen memberi: bahasa aktif dan fungsi ganti bahasa. Tombol memakai `aria-pressed`, grup memakai `aria-label`.

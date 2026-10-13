# Button

Tombol aksi; satu `ag-btn--primary` per area pandang, sisanya outline atau ghost.

- `ag-btn--primary` (`maroon`, teks `on-brand`): aksi utama — "Konsultasi Gratis", "Kirim".
- `ag-btn--outline`: aksi kedua di sebelah primary — "Lihat Layanan".
- `ag-btn--ghost`: link aksi dalam kartu — "Selengkapnya →".
- `ag-btn--wa` (`whatsapp`): hanya untuk membuka chat WhatsApp 0811 9996 286.
- `ag-btn--light`: tombol di atas blok `maroon` atau foto.
- `aria-disabled="true"`: fitur belum aktif, seperti **Login / Coba Gratis GARIS** — label wajib diakhiri "Segera Hadir", border putus-putus, tidak bisa diklik. URL tombol tetap disimpan di CMS supaya tinggal diaktifkan.
- Konsumen memberi: label (ID & EN), `href`, ikon opsional di kanan (`arrow`). Tinggi minimum 44px.

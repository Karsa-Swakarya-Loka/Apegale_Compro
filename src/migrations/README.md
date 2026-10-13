# Migrasi database

PostgreSQL dan SQLite memakai direktori berbeda. db push dinonaktifkan untuk mencegah pencampuran push dan migrasi.

Belum ada migrasi SQL yang dihasilkan: instalasi Payload terhalang akses npm registry pada sesi setup. Setelah dependensi tersedia, pilih adapter/URI dalam .env, lalu jalankan npm run migrate:create -- initial_cms, periksa SQL hasil generate dan jalankan npm run migrate. Commit hasil generate beserta snapshot. Ulangi pada adapter lain bila adapter tersebut akan dipakai; jangan menggunakan SQL PostgreSQL pada SQLite.

Verifikasi langkah 1: npm run seed dua kali, npm run verify:cms pada database QA baru, npm run build, npm run lint, npm run typecheck. Jangan lanjut langkah 2 sebelum semua pemeriksaan tersebut lolos.


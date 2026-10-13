// Dashboard starting point (admin.components.beforeDashboard): the one main task first, then the frequent ones, with the
// number of new messages that still need a reply. Gives the team an obvious place to begin.
import Link from 'next/link'
import type { Payload } from 'payload'

type Props = { payload: Payload; user?: { email?: string | null } | null }

export async function StartHere({ payload, user }: Props) {
  const fresh = await payload.count({ collection: 'inquiries', where: { status: { equals: 'baru' } }, overrideAccess: true }).then(r => r.totalDocs).catch(() => 0)
  const name = user?.email?.split('@')[0]
  return (
    <section className="cms-start" aria-labelledby="cms-start-title">
      <div className="cms-start__intro">
        <p className="cms-start__eyebrow">CMS Ape Gale Indonesia</p>
        <h1 id="cms-start-title" className="cms-start__title">Selamat datang{name ? `, ${name}` : ''}</h1>
        <p className="cms-start__lead">Ubah isi situs dari sini. Tekan <b>Simpan Draf</b> untuk menyimpan tanpa menampilkan, lalu <b>Publikasikan</b> agar perubahan tampil di situs.</p>
      </div>
      <div className="cms-start__tasks">
        <Link className="cms-task cms-task--primary" href="/admin/globals/home">
          <span className="cms-task__label">Ubah isi Beranda</span>
          <span className="cms-task__hint">Judul, foto, keunggulan, kota jaringan, pendiri</span>
        </Link>
        <Link className="cms-task" href="/admin/collections/inquiries">
          <span className="cms-task__label">Pesan masuk {fresh ? <span className="cms-task__badge">{fresh} baru</span> : null}</span>
          <span className="cms-task__hint">{fresh ? 'Ada pesan yang belum dihubungi' : 'Tidak ada pesan baru'}</span>
        </Link>
        <Link className="cms-task" href="/admin/collections/posts/create">
          <span className="cms-task__label">Tulis berita</span>
          <span className="cms-task__hint">Berita atau panduan baru</span>
        </Link>
        <Link className="cms-task" href="/admin/collections/services">
          <span className="cms-task__label">Kelola layanan</span>
          <span className="cms-task__hint">Isi, harga dan FAQ layanan</span>
        </Link>
        <Link className="cms-task" href="/admin/globals/site">
          <span className="cms-task__label">Kontak & alamat</span>
          <span className="cms-task__hint">Telepon, WhatsApp, email, media sosial</span>
        </Link>
      </div>
      <p className="cms-start__more">Semua bagian lain ada di bawah dan di menu kiri. <a href="/" target="_blank" rel="noopener noreferrer">Lihat situs ↗</a></p>
    </section>
  )
}

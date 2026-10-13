// Dashboard head (admin.components.beforeDashboard): the site's state in numbers, each tile opening the place where it is
// changed, plus the two most frequent actions. The collection index below stays Payload's own.
import Link from 'next/link'
import type { CollectionSlug, Payload, Where } from 'payload'

type Props = { payload: Payload }

export async function StartHere({ payload }: Props) {
  const count = (collection: CollectionSlug, where: Where) =>
    payload.count({ collection, where, overrideAccess: true }).then(r => r.totalDocs).catch(() => 0)
  const [fresh, postsLive, postsDraft, services] = await Promise.all([
    count('inquiries', { status: { equals: 'baru' } }),
    count('posts', { _status: { equals: 'published' } }),
    count('posts', { _status: { equals: 'draft' } }),
    count('services', { _status: { equals: 'published' } }),
  ])
  const site = process.env.NEXT_PUBLIC_SITE_URL || '/'
  const host = site.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return (
    <section className="cms-board" aria-labelledby="cms-board-title">
      <header className="cms-board__head">
        <h1 id="cms-board-title" className="cms-board__title">Ape Gale Indonesia</h1>
        <a className="cms-board__site" href={site} target="_blank" rel="noopener noreferrer">{host || 'Lihat situs'} ↗</a>
      </header>
      <div className="cms-board__grid">
        <Link className="cms-tile cms-tile--primary" href="/admin/globals/home">
          <span className="cms-tile__label">Halaman utama</span>
          <span className="cms-tile__title">Beranda</span>
          <span className="cms-tile__meta">Ubah isi →</span>
        </Link>
        <Link className={`cms-tile${fresh ? ' cms-tile--alert' : ''}`} href="/admin/collections/inquiries">
          <span className="cms-tile__label">Pesan baru</span>
          <span className="cms-tile__num">{fresh}</span>
          <span className="cms-tile__meta">{fresh ? 'Belum dihubungi' : 'Semua sudah ditangani'}</span>
        </Link>
        <Link className="cms-tile" href="/admin/collections/posts">
          <span className="cms-tile__label">Berita tayang</span>
          <span className="cms-tile__num">{postsLive}</span>
          <span className="cms-tile__meta">{postsDraft} draf</span>
        </Link>
        <Link className="cms-tile" href="/admin/collections/services">
          <span className="cms-tile__label">Layanan tayang</span>
          <span className="cms-tile__num">{services}</span>
          <span className="cms-tile__meta">Termasuk sub-layanan</span>
        </Link>
      </div>
      <div className="cms-board__actions">
        <Link className="cms-action cms-action--new" href="/admin/collections/posts/create">Tulis berita</Link>
        <Link className="cms-action" href="/admin/globals/site">Kontak & alamat</Link>
      </div>
    </section>
  )
}

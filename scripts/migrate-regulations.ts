// Migrates the legacy Enactments list (content/seed/regulations.json): downloads each PDF once into
// .data/legacy-pdfs, uploads it to Media (seedKey = original URL), and upserts a regulation by slug with
// the PDF attached. Status comes from the JSON (all draft until verified, owner decision #20).
// Also writes content/seed/legacy-pdf-redirects.json (old wp-content path → new media path) for step 9.
import 'dotenv/config'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

type Entry = { slug: string; title: string; number: string; category: string; year: number | null; status: 'draft' | 'published'; verify: string; source: string }
const { regulations } = JSON.parse(await readFile('content/seed/regulations.json', 'utf8')) as { regulations: Entry[] }
const dir = path.resolve('.data/legacy-pdfs')
await mkdir(dir, { recursive: true })

async function download(url: string): Promise<string> {
  const file = path.join(dir, decodeURIComponent(url.split('/').pop()!).replace(/[^A-Za-z0-9._-]+/g, '-'))
  try { if ((await stat(file)).size > 0) return file } catch { /* not downloaded yet */ }
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (apegale site migration)' } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.subarray(0, 4).toString() !== '%PDF') throw new Error(`Not a PDF: ${url}`)
  await writeFile(file, buf)
  return file
}

const payload = await getPayload({ config })
const redirects: Record<string, string> = {}
const rows: { slug: string; category: string; status: string; pdf: string }[] = []
try {
  for (const r of regulations) {
    const local = await download(r.source)
    const found = await payload.find({ collection: 'media', where: { seedKey: { equals: r.source } }, limit: 1, depth: 0, draft: true, overrideAccess: true })
    let media = found.docs[0]
    if (!media) {
      media = await payload.create({ collection: 'media', locale: 'id', overrideAccess: true, filePath: local,
        data: { alt: `Dokumen ${r.title} (PDF)`, seedKey: r.source, _status: 'published' } as never })
      await payload.update({ collection: 'media', id: media.id, locale: 'en', overrideAccess: true, data: { alt: `${r.title} document (PDF)`, _status: 'published' } as never })
    }
    redirects[new URL(r.source).pathname] = `/api/media/file/${media.filename}`
    const existing = await payload.find({ collection: 'regulations', where: { slug: { equals: r.slug } }, limit: 1, depth: 0, draft: true, overrideAccess: true })
    const publish = r.status === 'published'
    const base = { title: r.title, slug: r.slug, category: r.category, number: r.number, _status: publish ? 'published' : 'draft' }
    let id = existing.docs[0]?.id
    // attachments is a non-localized array with a localized label: write ID first, then reuse the
    // row ids for the EN write so the EN label lands on the same rows instead of replacing them.
    const idData = { ...base, attachments: [{ file: media.id, label: `Unduh ${r.title} (PDF)` }] }
    const saved = id
      ? await payload.update({ collection: 'regulations', id, locale: 'id', overrideAccess: true, draft: !publish, depth: 0, data: idData as never })
      : await payload.create({ collection: 'regulations', locale: 'id', overrideAccess: true, draft: !publish, depth: 0, data: idData as never })
    id = saved.id
    const rowIds = ((saved as { attachments?: { id?: string | null }[] }).attachments ?? []).map(a => a.id)
    await payload.update({ collection: 'regulations', id, locale: 'en', overrideAccess: true, draft: !publish, depth: 0,
      data: { ...base, attachments: [{ id: rowIds[0], file: media.id, label: `Download ${r.title} (PDF)` }] } as never })
    rows.push({ slug: r.slug, category: r.category, status: r.status, pdf: `${Math.round(Number(media.filesize ?? 0) / 1024)} KB` })
  }
  await writeFile('content/seed/legacy-pdf-redirects.json', JSON.stringify(redirects, null, 1) + '\n')
  console.table(rows)
  console.log(`${rows.length} regulations, ${Object.keys(redirects).length} PDF redirects written`)
} finally { await payload.destroy() }
// The Postgres pool can outlive destroy(); exit explicitly so scripts never hang.
process.exit(process.exitCode ?? 0)

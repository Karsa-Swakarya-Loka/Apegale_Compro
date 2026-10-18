// Replaces every client's logo with the files in design/assets/Clients/official (see SOURCES.md).
// Re-runnable: creates the media doc once (seedKey = path), re-uploads the file on later runs, and links it to the client by name.
import 'dotenv/config'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const files: Record<string, string> = {
  Affirmate: 'affirmate.png', KSB: 'ksb.png', AdaKami: 'adakami.png', unicharm: 'unicharm.png', CHINT: 'chint.png',
  'Ferbeck International': 'ferbeck.png', allnex: 'allnex.png', Lalamove: 'lalamove.png', Apple: 'apple.png',
  'Neo Energy': 'neo-energy.png', 'Taiheiyo Cement': 'taiheiyo-cement.png',
}
const payload = await getPayload({ config })
const rows: { client: string; media: number | string; result: string }[] = []
try {
  for (const [name, file] of Object.entries(files)) {
    const seedKey = `design/assets/Clients/official/${file}`
    const { docs: clients } = await payload.find({ collection: 'clients', where: { name: { equals: name } }, limit: 1, depth: 0, draft: true, overrideAccess: true })
    if (!clients[0]) { rows.push({ client: name, media: '-', result: 'CLIENT MISSING' }); continue }
    const found = await payload.find({ collection: 'media', where: { seedKey: { equals: seedKey } }, limit: 1, depth: 0, draft: true, overrideAccess: true })
    let media = found.docs[0]
    if (!media) {
      media = await payload.create({ collection: 'media', locale: 'id', overrideAccess: true, filePath: path.resolve(seedKey),
        data: { alt: `Logo ${name}`, seedKey, _status: 'published' } as never })
      await payload.update({ collection: 'media', id: media.id, locale: 'en', overrideAccess: true, data: { alt: `${name} logo`, _status: 'published' } as never })
    } else {
      // The file on disk is the source of truth: re-upload it so a corrected logo (e.g. Apple, 18 Oct 2026) replaces the old one.
      media = await payload.update({ collection: 'media', id: media.id, locale: 'id', overrideAccess: true, filePath: path.resolve(seedKey), overwriteExistingFiles: true,
        data: { alt: `Logo ${name}`, _status: 'published' } as never })
    }
    await payload.update({ collection: 'clients', id: clients[0].id, overrideAccess: true, data: { logo: media.id, _status: 'published' } as never })
    rows.push({ client: name, media: media.id, result: found.docs[0] ? 're-uploaded + linked' : 'uploaded + linked' })
  }
  console.table(rows)
} finally { await payload.destroy() }
// The Postgres pool can outlive destroy(); exit explicitly so scripts never hang.
process.exit(process.exitCode ?? 0)

// Replaces every client's logo with the official files in design/assets/Clients/official (see SOURCES.md).
// Re-runnable: uploads each file once (seedKey = path) and links it to the client by name.
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
    }
    await payload.update({ collection: 'clients', id: clients[0].id, overrideAccess: true, data: { logo: media.id, _status: 'published' } as never })
    rows.push({ client: name, media: media.id, result: found.docs[0] ? 'linked (existing upload)' : 'uploaded + linked' })
  }
  console.table(rows)
} finally { await payload.destroy() }
// The Postgres pool can outlive destroy(); exit explicitly so scripts never hang.
process.exit(process.exitCode ?? 0)

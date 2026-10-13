// Replaces CMS photos with the current files in design/assets/Photography (Oct 2026: GARIS dashboard laptop mockup,
// founder cut-out). Updates each existing upload in place (same Media id, so every page that uses it follows) and
// regenerates its image sizes. Skips files whose size already matches the upload, so it is safe to re-run.
// Works against whichever database/storage the env points at (local or production).
import 'dotenv/config'
import { statSync } from 'node:fs'
import path from 'node:path'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const seedKeys = ['design/assets/Photography/garis-dashboard.png', 'design/assets/Photography/founder-deny-imran.png']
const payload = await getPayload({ config })
const rows: Record<string, unknown>[] = []
try {
  for (const seedKey of seedKeys) {
    const { docs } = await payload.find({ collection: 'media', where: { seedKey: { equals: seedKey } }, limit: 1, depth: 0, draft: true, overrideAccess: true })
    if (!docs[0]) { rows.push({ seedKey, result: 'MISSING (run the seed first)' }); continue }
    if (docs[0].filesize === statSync(path.resolve(seedKey)).size) { rows.push({ seedKey, id: docs[0].id, result: 'already current' }); continue }
    const updated = await payload.update({ collection: 'media', id: docs[0].id, overrideAccess: true, filePath: path.resolve(seedKey), data: { _status: 'published' } as never })
    rows.push({ seedKey, id: updated.id, filename: updated.filename, size: `${updated.width}x${updated.height}`, result: 'replaced' })
  }
  console.table(rows)
} finally { await payload.destroy() }
// The Postgres pool can outlive destroy(); exit explicitly so scripts never hang.
process.exit(process.exitCode ?? 0)

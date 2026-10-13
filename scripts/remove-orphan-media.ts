// Deletes media uploaded by the first seed for the 5 company-profile logos, now replaced by design/assets/Clients/official.
// Only removes them when no client still points at them.
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const old = ['affirmate', 'chint', 'allnex', 'ferbeck', 'neo-energy'].map(n => `design/assets/Clients/${n}.png`)
const payload = await getPayload({ config })
try {
  for (const seedKey of old) {
    const { docs } = await payload.find({ collection: 'media', where: { seedKey: { equals: seedKey } }, limit: 1, depth: 0, draft: true, overrideAccess: true })
    const media = docs[0]
    if (!media) { console.log(seedKey, '— not found'); continue }
    const users = await payload.count({ collection: 'clients', where: { logo: { equals: media.id } }, overrideAccess: true })
    if (users.totalDocs) { console.log(seedKey, `— kept, still used by ${users.totalDocs} client(s)`); continue }
    await payload.delete({ collection: 'media', id: media.id, overrideAccess: true })
    console.log(seedKey, '— deleted (unused)')
  }
} finally { await payload.destroy() }
// The Postgres pool can outlive destroy(); exit explicitly so scripts never hang.
process.exit(process.exitCode ?? 0)

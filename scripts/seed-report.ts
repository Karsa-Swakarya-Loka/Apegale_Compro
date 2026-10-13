import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'
import { reportCounts } from '../src/seed/report.ts'
const payload = await getPayload({ config })
try { console.table(await reportCounts(payload)) } finally { await payload.destroy() }
// The Postgres pool can outlive destroy(); exit explicitly so scripts never hang.
process.exit(process.exitCode ?? 0)

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config.ts'
import { runSeed } from './run.ts'
import { payloadStore } from './store.ts'
import { reportCounts } from './report.ts'
const payload = await getPayload({ config })
try {
 console.log(await runSeed(payloadStore(payload), process.cwd(), process.env.SEED_OVERWRITE === 'true'))
 console.table(await reportCounts(payload))
} finally { await payload.destroy() }
// The Postgres pool can outlive destroy(); exit explicitly so scripts never hang.
process.exit(process.exitCode ?? 0)

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'
const email = process.env.ADMIN_EMAIL
const password = process.env.ADMIN_PASSWORD
if (!email || !password || password.length < 12) throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 12 characters) before setup:admin')
const payload = await getPayload({ config })
try {
 const existing = await payload.find({ collection: 'users', limit: 1, overrideAccess: true })
 if (existing.totalDocs) throw new Error('Users already exist. Manage accounts through /admin; bootstrap will not change them.')
 await payload.create({ collection: 'users', data: { email, password, role: 'admin' }, overrideAccess: true })
 console.log('First administrator created. Remove ADMIN_PASSWORD from the environment.')
} finally { await payload.destroy() }
// The Postgres pool can outlive destroy(); exit explicitly so scripts never hang.
process.exit(process.exitCode ?? 0)

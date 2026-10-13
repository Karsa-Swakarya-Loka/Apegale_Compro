import path from 'node:path'
import { mkdirSync } from 'node:fs'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
export function database() {
 const adapter = process.env.DATABASE_ADAPTER || 'postgres'
 if (!['postgres','sqlite'].includes(adapter)) throw new Error('DATABASE_ADAPTER must be postgres or sqlite')
 const uri = process.env.DATABASE_URI
 if (!uri) throw new Error('DATABASE_URI is required')
 if (adapter === 'sqlite') {
  if (uri.startsWith('file:')) mkdirSync(path.dirname(path.resolve(uri.slice(5))), { recursive: true })
  return sqliteAdapter({ client: { url: uri }, push: false, migrationDir: path.resolve('src/migrations/sqlite') })
 }
 return postgresAdapter({ pool: { connectionString: uri }, push: false, migrationDir: path.resolve('src/migrations/postgres') })
}

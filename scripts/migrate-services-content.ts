// Writes service bodies (ID + EN) from content/seed/services-content.json and applies each entry's status.
// Re-runnable: it overwrites body for the listed slugs only. Draft entries stay unpublished (owner decisions #7, #20).
import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'
import { toLexical, validateContent, type ServicesContentFile } from '../src/seed/services-content.ts'

const file = JSON.parse(await readFile('content/seed/services-content.json', 'utf8')) as ServicesContentFile
const problems = validateContent(file)
if (problems.length) { console.error(problems.join('\n')); process.exit(1) }

// Copy-only revisions may target existing published descriptions without touching legal drafts.
const publishedOnly = process.argv.includes('--published-only')
const payload = await getPayload({ config })
const summary: { slug: string; status: string; result: string }[] = []
try {
  for (const [slug, content] of Object.entries(file.services)) {
    if (publishedOnly && content.status !== 'published') continue
    const { docs } = await payload.find({ collection: 'services', where: { slug: { equals: slug } }, draft: true, depth: 0, limit: 1, overrideAccess: true })
    const doc = docs[0]
    if (!doc) { summary.push({ slug, status: content.status, result: 'MISSING (run npm run seed first)' }); continue }
    if (publishedOnly && doc._status !== 'published') continue
    const publish = content.status === 'published'
    for (const locale of ['id', 'en'] as const) {
      await payload.update({
        collection: 'services', id: doc.id, locale, overrideAccess: true, depth: 0, draft: !publish,
        data: { body: toLexical(content[locale]) as never, _status: publish ? 'published' : 'draft' },
      })
    }
    summary.push({ slug, status: content.status, result: 'ok' })
  }
  console.table(summary)
} finally { await payload.destroy() }
// The Postgres pool can outlive destroy(); exit explicitly so scripts never hang.
process.exit(process.exitCode ?? 0)

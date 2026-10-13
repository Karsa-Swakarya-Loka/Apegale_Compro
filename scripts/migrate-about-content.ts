// Writes the About page rich text (greeting + profile, ID and EN) from content/seed/about-content.json
// into the published `about` global. Re-runnable; other About fields (vision, mission, values, organigram) are untouched.
import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'
import { toLexical, type Block } from '../src/seed/services-content.ts'

type Part = { source: string; id: Block[]; en: Block[] }
const file = JSON.parse(await readFile('content/seed/about-content.json', 'utf8')) as { greeting: Part; profile: Part }
for (const key of ['greeting', 'profile'] as const) {
  const part = file[key]
  if (!part.id?.length || part.id.length !== part.en?.length) throw new Error(`${key}: ID and EN must have the same number of blocks`)
}

const payload = await getPayload({ config })
try {
  for (const locale of ['id', 'en'] as const) {
    await payload.updateGlobal({
      slug: 'about', locale, depth: 0, overrideAccess: true, draft: false,
      data: { greeting: toLexical(file.greeting[locale]) as never, profile: toLexical(file.profile[locale]) as never, _status: 'published' },
    })
  }
  const check = await payload.findGlobal({ slug: 'about', locale: 'en', draft: false, depth: 0, overrideAccess: true })
  console.log({ greetingBlocks: check.greeting?.root.children.length, profileBlocks: check.profile?.root.children.length, status: check._status })
} finally { await payload.destroy() }
// The Postgres pool can outlive destroy(); exit explicitly so scripts never hang.
process.exit(process.exitCode ?? 0)

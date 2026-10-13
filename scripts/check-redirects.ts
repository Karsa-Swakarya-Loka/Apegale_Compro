// Checks every legacy URL against a running server: one hop, HTTP 301, the expected target.
// Also checks that a trailing slash on a new page is a single 301 to the slash-less path.
// Usage: npm run check:redirects -- http://localhost:3000   (default base: NEXT_PUBLIC_SITE_URL)
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { legacyRedirects } from '../src/lib/legacy-redirects.ts'

const base = (process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '')
const pdfMap = JSON.parse(readFileSync(path.resolve(import.meta.dirname, '../content/seed/legacy-pdf-redirects.json'), 'utf8'))
const cases = [
  ...legacyRedirects(pdfMap).map(r => ({ from: r.source, to: r.destination })),
  { from: '/en/', to: '/en' }, { from: '/layanan/', to: '/layanan' }, { from: '/en/services/manpower-supply/', to: '/en/services/manpower-supply' },
  { from: '/regulasi/?kategori=lainnya', to: '/regulasi?kategori=lainnya' }, { from: '/news/', to: '/news' }, { from: '/hubungi-kami/', to: '/hubungi-kami' },
]

let failed = 0
for (const c of cases) {
  const res = await fetch(base + c.from, { redirect: 'manual' })
  const location = res.headers.get('location') ?? ''
  const target = location.startsWith('http') ? location.slice(new URL(location).origin.length) : location
  const ok = res.status === 301 && target === c.to
  if (!ok) { failed++; console.log(`FAIL  ${c.from} → ${res.status} ${location || '(no location)'}  (expected 301 ${c.to})`) }
}
console.log(`${cases.length - failed}/${cases.length} redirects OK`)
process.exit(failed ? 1 : 0)

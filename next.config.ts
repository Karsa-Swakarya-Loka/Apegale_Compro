import type { NextConfig } from 'next'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { withPayload } from '@payloadcms/next/withPayload'
import { legacyRedirects } from './src/lib/legacy-redirects.ts'

const pdfMap = JSON.parse(readFileSync(path.join(/*turbopackIgnore: true*/ process.cwd(), 'content/seed/legacy-pdf-redirects.json'), 'utf8'))

const config: NextConfig = {
  // Old WordPress URLs end in "/". Next's own trailing-slash redirect is a 308 and would add a hop before
  // our 301, so it is off; proxy.ts strips any other trailing slash with a 301 instead.
  skipTrailingSlashRedirect: true,
  // AVIF first (smallest), WebP for browsers without it (docs/04).
  images: { formats: ['image/avif', 'image/webp'] },
  async redirects() { return [{ source: '/en/', destination: '/en', statusCode: 301 }, ...legacyRedirects(pdfMap)] },
}
export default withPayload(config)

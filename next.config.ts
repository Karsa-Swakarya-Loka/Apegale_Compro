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
  // Media URLs carry ?v=<updatedAt> (lib/cms.ts asMedia) so a re-uploaded file is never served stale; next/image
  // must be told that query strings are allowed on that path. Other local images stay query-free.
  images: { formats: ['image/avif', 'image/webp'], localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/**', search: '' }] },
  async redirects() { return [{ source: '/en/', destination: '/en', statusCode: 301 }, ...legacyRedirects(pdfMap)] },
  // Security-advisory reminders for coding-agent upgrades (next upgrade --agent); does not upgrade on its own.
  experimental: { agentUpgrade: 'security' },
}
export default withPayload(config)

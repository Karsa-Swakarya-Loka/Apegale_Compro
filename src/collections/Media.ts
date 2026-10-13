import path from 'node:path'
import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { review, seedKey, text } from '../lib/fields.ts'
export const Media: CollectionConfig = {
 slug: 'media', admin: { useAsTitle: 'alt', defaultColumns: ['filename','alt','_status','enReviewed'] },
 access: contentAccess, versions: { drafts: true },
 upload: {
  staticDir: path.resolve(/*turbopackIgnore: true*/ process.cwd(), process.env.MEDIA_DIR || 'media'),
  mimeTypes: ['image/jpeg','image/png','image/webp','image/svg+xml','application/pdf'],
  imageSizes: [ { name: 'thumb', width: 400 }, { name: 'card', width: 800 },
   { name: 'hero', width: 1600 }, { name: 'og', width: 1200, height: 630, fit: 'cover' } ],
  adminThumbnail: 'thumb',
 }, fields: [text('alt', true), seedKey, review],
}

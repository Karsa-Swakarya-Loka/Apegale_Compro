import path from 'node:path'
import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { review, seedKey, text, statusColumn } from '../lib/fields.ts'
export const Media: CollectionConfig = {
 slug: 'media', labels: { singular: 'Foto & file', plural: 'Foto & file' },
 admin: { hideAPIURL: true, group: 'Konten situs', useAsTitle: 'alt', defaultColumns: ['filename', 'alt', 'statusBadge'],
  description: 'Semua foto, logo dan PDF yang dipakai situs.' },
 access: contentAccess, versions: { drafts: true },
 upload: {
  staticDir: path.resolve(/*turbopackIgnore: true*/ process.cwd(), process.env.MEDIA_DIR || 'media'),
  mimeTypes: ['image/jpeg','image/png','image/webp','image/svg+xml','application/pdf'],
  imageSizes: [ { name: 'thumb', width: 400 }, { name: 'card', width: 800 },
   { name: 'hero', width: 1600 }, { name: 'og', width: 1200, height: 630, fit: 'cover' } ],
  adminThumbnail: 'thumb',
 },
 fields: [statusColumn, text('alt', true, { label: 'Keterangan gambar', description: 'Jelaskan isi gambar singkat, mis. "Tim Ape Gale di kantor Jakarta". Dibaca Google dan pembaca layar.' }), seedKey, review],
}

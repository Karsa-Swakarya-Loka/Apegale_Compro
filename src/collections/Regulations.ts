import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { review, richText, slug, text, textarea } from '../lib/fields.ts'
import { previewUrl } from '../lib/preview.ts'
export const Regulations: CollectionConfig = {
 slug: 'regulations', admin: { preview: previewUrl('regulations', true), useAsTitle: 'title', defaultColumns: ['title','category','issuedAt','_status','enReviewed'] },
 access: contentAccess, versions: { drafts: true },
 fields: [text('title', true), slug, { name: 'category', type: 'select', required: true,
 options: ['cipta-kerja','perizinan-tka','keimigrasian-tka','manpower-supply','lainnya'] },
 { name: 'number', type: 'text' }, { name: 'issuedAt', type: 'date' }, textarea('summary'), richText('body'),
 { name: 'attachments', type: 'array', fields: [
   { name: 'file', type: 'upload', relationTo: 'media', required: true, filterOptions: { mimeType: { equals: 'application/pdf' } } }, text('label', true),
 ] }, review],
}

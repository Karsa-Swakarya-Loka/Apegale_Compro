import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { order, review, richText, seedKey, text } from '../lib/fields.ts'
export const Faqs: CollectionConfig = {
 slug: 'faqs', admin: { useAsTitle: 'question', defaultColumns: ['question','category','featured','_status','enReviewed'] },
 access: contentAccess, versions: { drafts: true },
 fields: [text('question', true), richText('answer'), { name: 'category', type: 'select', required: true, options: ['umum','layanan','garis'] },
 { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
 { name: 'featured', type: 'checkbox', defaultValue: false }, order, seedKey, review],
}

import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { review, richText, seo, slug, text, textarea, upload } from '../lib/fields.ts'
import { previewUrl } from '../lib/preview.ts'
export const Posts: CollectionConfig = {
 slug: 'posts', admin: { preview: previewUrl('news', true), useAsTitle: 'title', defaultColumns: ['title','category','publishedAt','_status','enReviewed'] },
 access: contentAccess, versions: { drafts: true },
 fields: [text('title', true), slug, { name: 'category', type: 'select', required: true, options: ['news','panduan'] },
 upload('cover'), textarea('excerpt'), richText('body'), { name: 'publishedAt', type: 'date' }, seo(), review],
}

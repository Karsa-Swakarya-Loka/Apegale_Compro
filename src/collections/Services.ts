import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { iconOptions, order, review, richText, seo, slug, text, textarea, upload } from '../lib/fields.ts'
import { previewUrl } from '../lib/preview.ts'
export const Services: CollectionConfig = {
 slug: 'services', admin: { preview: previewUrl('services', true), useAsTitle: 'title', defaultColumns: ['title','slug','_status','enReviewed','order'] },
 access: contentAccess, versions: { drafts: true },
 fields: [text('title', true), slug, order,
  { name: 'parent', type: 'relationship', relationTo: 'services' },
  { name: 'showInMenu', type: 'checkbox', defaultValue: true },
  { name: 'icon', type: 'select', options: iconOptions },
  { name: 'summary', type: 'textarea', localized: true, maxLength: 600 }, richText('body'),
  { name: 'requirements', type: 'array', localized: true, fields: [{ name: 'text', type: 'text', required: true }] },
  { name: 'priceItems', type: 'array', fields: [text('name', true), text('note'), text('duration'),
    { name: 'priceFrom', type: 'number', min: 0, admin: { description: 'IDR; kosong berarti Hubungi kami.' } },
    { name: 'featured', type: 'checkbox', defaultValue: false }] },
  textarea('priceNote'), { name: 'priceUpdatedAt', type: 'date' }, upload('image'), seo(), review,
 ],
}

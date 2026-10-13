import type { GlobalConfig } from 'payload'
import { globalAccess } from '../lib/access.ts'
import { seo, text, textarea, upload } from '../lib/fields.ts'
import { httpUrl } from '../lib/validation.ts'
import { previewUrl } from '../lib/preview.ts'
export const Garis: GlobalConfig = {
 slug: 'garis', label: 'GARIS', admin: { preview: previewUrl('garis') }, access: globalAccess, versions: { drafts: true },
 fields: [{ name: 'enabled', type: 'checkbox', defaultValue: false },
 { name: 'loginUrl', type: 'text', validate: httpUrl }, { name: 'trialUrl', type: 'text', validate: httpUrl },
 textarea('intro'), seo(), upload('logo'),
 { name: 'variants', type: 'array', fields: [{ name: 'name', type: 'text', required: true }, textarea('text'), upload('image')] },
 { name: 'features', type: 'array', fields: [text('title'), textarea('text')] },
 { name: 'gallery', type: 'array', fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }] },
 ],
}

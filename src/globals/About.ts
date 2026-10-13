import type { GlobalConfig } from 'payload'
import { globalAccess } from '../lib/access.ts'
import { richText, seo, text, textarea } from '../lib/fields.ts'
import { previewUrl } from '../lib/preview.ts'
export const About: GlobalConfig = {
 slug: 'about', label: 'Tentang Kami', admin: { preview: previewUrl('about') }, access: globalAccess, versions: { drafts: true },
 fields: [textarea('intro'), seo(), richText('greeting'), richText('profile'), textarea('vision'),
 { name: 'mission', type: 'array', localized: true, fields: [{ name: 'text', type: 'text', required: true }] },
 { name: 'values', type: 'array', fields: [text('title'), textarea('text')] },
 { name: 'organigram', type: 'array', fields: [{ name: 'name', type: 'text', required: true }, text('role'),
 { name: 'parentIndex', type: 'number', min: 0, admin: { description: 'Indeks atasan mulai dari 0; kosong untuk direktur.' } }] }],
}

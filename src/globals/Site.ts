import type { GlobalConfig } from 'payload'
import { adminOnly, globalAccess } from '../lib/access.ts'
import { seo, text, textarea } from '../lib/fields.ts'
import { httpUrl } from '../lib/validation.ts'
export const Site: GlobalConfig = {
 slug: 'site', label: 'Pengaturan situs', access: { ...globalAccess, update: adminOnly }, versions: { drafts: true },
 fields: [{ name: 'phone', type: 'text' }, { name: 'whatsapp', type: 'text', validate: (v: unknown) => !v || /^\d+$/.test(String(v)) || 'Gunakan angka tanpa tanda +.' },
 text('whatsappDefaultMessage'), { name: 'email', type: 'email' }, textarea('address'),
 { name: 'mapsUrl', type: 'text', validate: httpUrl },
 { name: 'stats', type: 'array', fields: [{ name: 'value', type: 'text', required: true }, text('label', true)] },
 { name: 'social', type: 'array', fields: [{ name: 'platform', type: 'select', options: ['instagram','linkedin','youtube','facebook'], required: true },
 { name: 'url', type: 'text', required: true, validate: httpUrl }] }, seo('seoDefault')],
}

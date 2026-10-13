import type { GlobalConfig } from 'payload'
import { globalAccess } from '../lib/access.ts'
import { iconOptions, seo, text, textarea, upload } from '../lib/fields.ts'
import { previewUrl } from '../lib/preview.ts'
export const Home: GlobalConfig = {
 slug: 'home', label: 'Home', admin: { preview: previewUrl('home') }, access: globalAccess, versions: { drafts: true },
 fields: [textarea('intro'), seo(),
 { name: 'hero', type: 'group', fields: [text('eyebrow'), text('headline'), text('highlight'), textarea('lead'), upload('image'),
 { name: 'primaryCta', type: 'group', fields: [text('label'), { name: 'href', type: 'text' }] },
 { name: 'secondaryCta', type: 'group', fields: [text('label'), { name: 'href', type: 'text' }] }] },
 { name: 'why', type: 'array', maxRows: 4, fields: [{ name: 'icon', type: 'select', options: iconOptions }, text('title'), textarea('text')] },
 { name: 'network', type: 'group', fields: [text('title'), textarea('text'),
 { name: 'cities', type: 'array', fields: [{ name: 'name', type: 'text', required: true },
 { name: 'lat', type: 'number', min: -90, max: 90, required: true }, { name: 'lng', type: 'number', min: -180, max: 180, required: true }] }] },
 { name: 'founder', type: 'group', fields: [upload('photo'), textarea('quote'), { name: 'name', type: 'text' }, text('role')] },
 { name: 'sectionsVisible', type: 'group', fields: ['hero','clients','services','why','garis','network','founder','testimonials','faq','news','contactCta'].map(name => ({ name, type: 'checkbox' as const, defaultValue: true })) },
 ],
}

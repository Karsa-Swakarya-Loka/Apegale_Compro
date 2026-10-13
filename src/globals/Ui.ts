import type { GlobalConfig } from 'payload'
import { globalAccess } from '../lib/access.ts'
import { seo, text, textarea } from '../lib/fields.ts'
export const Ui: GlobalConfig = {
 slug: 'ui', label: 'Teks antarmuka', access: globalAccess, versions: { drafts: true },
 fields: [
  { name: 'nav', type: 'group', fields: [text('home'), text('about'), text('services'), text('garis'), text('regulations'), text('news'), text('contact')] },
  { name: 'cta', type: 'group', fields: [text('consult'), text('viewServices'), text('more'), text('read'), text('whatsapp'), text('askWhatsapp'), text('send'), text('download'), text('comingSoon')] },
  { name: 'form', type: 'group', fields: [text('name'), text('company'), text('email'), text('whatsapp'), text('service'), text('message'), text('errorEmail'), text('errorRequired'), text('success')] },
  { name: 'price', type: 'group', fields: [text('service'), text('duration'), text('from'), text('contact'), text('note')] },
  { name: 'sections', type: 'group', fields: [text('services'), text('why'), text('clients'), text('testimonials'), text('faq'), text('news')] },
  { name: 'lang', type: 'group', fields: [text('label')] },
 { name: 'pages', type: 'group', fields: ['services','regulations','news','contact'].map(name => ({ name, type: 'group' as const, fields: [textarea('intro'), seo()] })) },
 ],
}

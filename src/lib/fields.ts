import type { Field } from 'payload'
export const text = (name: string, required = false): Field => ({ name, type: 'text', localized: true, required })
export const textarea = (name: string): Field => ({ name, type: 'textarea', localized: true })
export const richText = (name: string): Field => ({ name, type: 'richText', localized: true })
export const upload = (name: string): Field => ({ name, type: 'upload', relationTo: 'media' })
export const review: Field = { name: 'enReviewed', type: 'checkbox', defaultValue: false, label: 'English sudah direview', admin: { position: 'sidebar' } }
export const seedKey: Field = { name: 'seedKey', type: 'text', unique: true, index: true, admin: { readOnly: true, position: 'sidebar' } }
export const seo = (name = 'seo'): Field => ({ name, type: 'group', fields: [text('title'), textarea('description'), upload('ogImage')] })
export const slug: Field = { name: 'slug', type: 'text', required: true, unique: true, index: true, validate: (value: unknown) => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) || 'Gunakan slug huruf kecil dan tanda hubung.' }
export const order: Field = { name: 'order', type: 'number', defaultValue: 0 }
export const iconOptions = ['globe','file-text','users','building-2','plane','briefcase','id-card','stamp','layers','sun','monitor-check','timer','shield-check','map']


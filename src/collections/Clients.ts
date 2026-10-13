import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { order, review, row, upload } from '../lib/fields.ts'
import { httpUrl } from '../lib/validation.ts'
export const Clients: CollectionConfig = {
 slug: 'clients', labels: { singular: 'Klien', plural: 'Klien' },
 admin: { group: 'Konten situs', useAsTitle: 'name', defaultColumns: ['name', 'order', '_status', 'enReviewed'],
  description: 'Logo klien yang berjalan di Beranda.' },
 access: contentAccess, versions: { drafts: true },
 fields: [
  row({ name: 'name', type: 'text', required: true, unique: true, label: 'Nama klien', admin: { width: '50%' } },
   { name: 'url', type: 'text', validate: httpUrl, label: 'Situs klien (opsional)', admin: { width: '50%', placeholder: 'https://' } }),
  upload('logo', { label: 'Logo', description: 'PNG/SVG berlatar transparan, minimal tinggi 120 px.' }),
  order, review,
 ],
}

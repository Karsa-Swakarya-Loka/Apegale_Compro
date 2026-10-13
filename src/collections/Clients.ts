import type { CollectionConfig } from 'payload'
import { contentAccess } from '../lib/access.ts'
import { order, review, upload } from '../lib/fields.ts'
import { httpUrl } from '../lib/validation.ts'
export const Clients: CollectionConfig = {
 slug: 'clients', admin: { useAsTitle: 'name', defaultColumns: ['name','order','_status','enReviewed'] },
 access: contentAccess, versions: { drafts: true },
 fields: [{ name: 'name', type: 'text', required: true, unique: true }, upload('logo'),
 { name: 'url', type: 'text', validate: httpUrl }, order, review],
}

import type { CollectionConfig } from 'payload'
import { adminOnly } from '../lib/access.ts'
import { emailRequired, validPhone } from '../lib/validation.ts'
export const Inquiries: CollectionConfig = {
 slug: 'inquiries', admin: { useAsTitle: 'name', defaultColumns: ['name','service','locale','status','emailStatus','createdAt'] },
 // Public forms will use the validated server handler in step 8, never unrestricted REST create.
 access: { create: adminOnly, read: adminOnly, update: adminOnly, delete: adminOnly },
 timestamps: true,
 hooks: { beforeValidate: [({ data, originalDoc }) => {
   if (data && !emailRequired(data.variant ?? originalDoc?.variant ?? 'full', data.email ?? originalDoc?.email))
     throw new Error('Email wajib untuk formulir lengkap.')
   return data
 }] },
 fields: [ { name: 'name', type: 'text', required: true }, { name: 'company', type: 'text' },
 { name: 'email', type: 'email' },
 { name: 'whatsapp', type: 'text', required: true, validate: (value: unknown) => validPhone(value) || 'Nomor WhatsApp tidak valid.' },
 { name: 'service', type: 'relationship', relationTo: 'services', required: true },
 { name: 'message', type: 'textarea', required: true },
 { name: 'locale', type: 'select', options: ['id','en'], required: true },
 { name: 'variant', type: 'select', options: ['compact','full'], defaultValue: 'full', required: true },
 { name: 'status', type: 'select', options: ['baru','dihubungi','selesai'], defaultValue: 'baru', required: true },
 { name: 'emailStatus', type: 'select', options: ['pending','sent','failed'], defaultValue: 'pending', required: true },
 ],
}

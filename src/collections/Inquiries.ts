import type { CollectionConfig } from 'payload'
import { adminOnly } from '../lib/access.ts'
import { row } from '../lib/fields.ts'
import { emailRequired, validPhone } from '../lib/validation.ts'
export const Inquiries: CollectionConfig = {
 slug: 'inquiries', labels: { singular: 'Pesan masuk', plural: 'Pesan masuk' },
 admin: { group: 'Pesan masuk', useAsTitle: 'name', defaultColumns: ['name', 'service', 'status', 'createdAt', 'emailStatus'],
  description: 'Pesan dari formulir situs. Ubah status setelah pengirim dihubungi.' },
 // Public forms will use the validated server handler in step 8, never unrestricted REST create.
 access: { create: adminOnly, read: adminOnly, update: adminOnly, delete: adminOnly },
 timestamps: true,
 hooks: { beforeValidate: [({ data, originalDoc }) => {
   if (data && !emailRequired(data.variant ?? originalDoc?.variant ?? 'full', data.email ?? originalDoc?.email))
     throw new Error('Email wajib untuk formulir lengkap.')
   return data
 }] },
 fields: [
  row({ name: 'name', type: 'text', required: true, label: 'Nama', admin: { width: '50%' } }, { name: 'company', type: 'text', label: 'Perusahaan', admin: { width: '50%' } }),
  row({ name: 'email', type: 'email', label: 'Email', admin: { width: '50%' } },
   { name: 'whatsapp', type: 'text', required: true, label: 'WhatsApp', admin: { width: '50%' }, validate: (value: unknown) => validPhone(value) || 'Nomor WhatsApp tidak valid.' }),
  { name: 'service', type: 'relationship', relationTo: 'services', required: true, label: 'Layanan yang ditanyakan' },
  { name: 'message', type: 'textarea', required: true, label: 'Pesan' },
  { name: 'status', type: 'select', required: true, defaultValue: 'baru', label: 'Status tindak lanjut', admin: { position: 'sidebar' },
   options: [{ label: 'Baru', value: 'baru' }, { label: 'Sudah dihubungi', value: 'dihubungi' }, { label: 'Selesai', value: 'selesai' }] },
  { name: 'locale', type: 'select', options: [{ label: 'Indonesia', value: 'id' }, { label: 'Inggris', value: 'en' }], required: true, label: 'Bahasa pengirim', admin: { position: 'sidebar', readOnly: true } },
  { name: 'variant', type: 'select', options: [{ label: 'Form singkat (Beranda)', value: 'compact' }, { label: 'Form lengkap (Hubungi Kami)', value: 'full' }], defaultValue: 'full', required: true, label: 'Dari formulir', admin: { position: 'sidebar', readOnly: true } },
  { name: 'emailStatus', type: 'select', options: [{ label: 'Menunggu', value: 'pending' }, { label: 'Terkirim', value: 'sent' }, { label: 'Gagal', value: 'failed' }], defaultValue: 'pending', required: true, label: 'Notifikasi email', admin: { position: 'sidebar', readOnly: true } },
 ],
}

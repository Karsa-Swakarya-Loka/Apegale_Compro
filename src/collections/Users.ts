import type { CollectionConfig } from 'payload'
import { adminField, adminOnly, isStaff } from '../lib/access.ts'
export const Users: CollectionConfig = {
 slug: 'users', auth: true, labels: { singular: 'Pengguna CMS', plural: 'Pengguna CMS' },
 admin: { hideAPIURL: true, group: 'Pengaturan', useAsTitle: 'email', defaultColumns: ['email', 'role'], description: 'Akun yang bisa masuk ke CMS.' },
 access: { admin: ({ req }) => isStaff(req.user), create: adminOnly, read: adminOnly, update: adminOnly, delete: adminOnly },
 fields: [{ name: 'role', type: 'select', required: true, defaultValue: 'editor', label: 'Peran',
  options: [{ label: 'Admin (semua akses)', value: 'admin' }, { label: 'Editor (ubah konten)', value: 'editor' }],
  admin: { description: 'Editor bisa mengubah konten; hanya admin yang bisa mengubah pengaturan situs dan pengguna.' },
  access: { create: adminField, update: adminField }, saveToJWT: true }],
 hooks: { beforeChange: [async ({ data, operation, req }) => {
  // Payload's create-first-user flow is the only anonymous bootstrap.
  if (operation === 'create' && !req.user) {
   const { totalDocs } = await req.payload.count({ collection: 'users', overrideAccess: true, req })
   if (totalDocs === 0) data.role = 'admin'
  }
  return data
 }] },
}

import type { CollectionConfig } from 'payload'
import { adminField, adminOnly, isStaff } from '../lib/access.ts'
export const Users: CollectionConfig = {
 slug: 'users', auth: true, admin: { useAsTitle: 'email', defaultColumns: ['email','role'] },
 access: { admin: ({ req }) => isStaff(req.user), create: adminOnly, read: adminOnly, update: adminOnly, delete: adminOnly },
 fields: [{ name: 'role', type: 'select', options: ['admin','editor'], required: true, defaultValue: 'editor',
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

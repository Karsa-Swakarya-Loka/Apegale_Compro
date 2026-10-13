import type { Access, FieldAccess } from 'payload'

export function isStaff(user: { role?: string | null } | null | undefined): boolean {
  return user?.role === 'admin' || user?.role === 'editor'
}
export const staff: Access = ({ req }) => isStaff(req.user)
export const adminOnly: Access = ({ req }) => req.user?.role === 'admin'
export const adminField: FieldAccess = ({ req }) => req.user?.role === 'admin'
export const publishedOrStaff: Access = ({ req }) =>
  isStaff(req.user) ? true : { _status: { equals: 'published' } }
export const contentAccess = {
  read: publishedOrStaff, create: staff, update: staff, delete: staff, readVersions: staff,
}
// Globals are read by trusted server-side queries with draft:false.
// Direct REST access is staff-only so a draft query cannot expose unpublished global data.
export const globalAccess = { read: staff, update: staff, readVersions: staff }

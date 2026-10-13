// CMS sidebar and dashboard index, in the order the team works: change a page, manage the content lists, answer new
// messages, then settings. Labels come from each collection/global (see nav.ts).
import type { NavMap } from './nav'

export const NAV_MAP: NavMap = [
  { label: 'Ubah halaman', items: [
    { global: 'home', icon: 'home' },
    { global: 'about', icon: 'info' },
    { global: 'garis', icon: 'monitor' },
  ] },
  { label: 'Kelola isi', items: [
    { collection: 'services', icon: 'briefcase' },
    { collection: 'posts', icon: 'newspaper' },
    { collection: 'regulations', icon: 'book' },
    { collection: 'faqs', icon: 'help' },
    { collection: 'testimonials', icon: 'quote' },
    { collection: 'clients', icon: 'building' },
    { collection: 'media', icon: 'image' },
  ] },
  { label: 'Pesan', items: [
    { collection: 'inquiries', icon: 'inbox', badge: { status: { equals: 'baru' } } },
  ] },
  { label: 'Pengaturan', items: [
    { global: 'site', icon: 'sliders' },
    { global: 'ui', icon: 'type' },
    { collection: 'users', icon: 'users' },
  ] },
]

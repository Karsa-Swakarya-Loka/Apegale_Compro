import type { Field, Tab } from 'payload'

// Field helpers. Labels and help texts are for the client's team (CMS in Indonesian). Layout helpers (row, tab,
// collapsible) are presentational only: they never change the stored data shape, so no migration is needed.
type Opts = { label?: string; description?: string; width?: string; placeholder?: string; sidebar?: boolean }
const ui = (o?: Opts) => {
  const admin = {
    ...(o?.description ? { description: o.description } : {}),
    ...(o?.width ? { width: o.width } : {}),
    ...(o?.placeholder ? { placeholder: o.placeholder } : {}),
    ...(o?.sidebar ? { position: 'sidebar' as const } : {}),
  }
  return { ...(o?.label ? { label: o.label } : {}), ...(Object.keys(admin).length ? { admin } : {}) }
}
export const text = (name: string, required = false, o?: Opts): Field => ({ name, type: 'text', localized: true, required, ...ui(o) })
export const textarea = (name: string, o?: Opts): Field => ({ name, type: 'textarea', localized: true, ...ui(o) })
export const richText = (name: string, o?: Opts): Field => ({ name, type: 'richText', localized: true, ...ui(o) })
export const upload = (name: string, o?: Opts): Field => ({ name, type: 'upload', relationTo: 'media', ...ui(o) })
export const plain = (name: string, o?: Opts & { required?: boolean }): Field => ({ name, type: 'text', required: o?.required, ...ui(o) })

/** Layout: fields side by side (widths per field via `width`). */
export const row = (...fields: Field[]): Field => ({ type: 'row', fields })
export const tab = (label: string, fields: Field[], description?: string): Tab => ({ label, fields, ...(description ? { description } : {}) })
export const tabs = (...list: Tab[]): Field => ({ type: 'tabs', tabs: list })
export const collapsible = (label: string, fields: Field[], open = false): Field => ({ type: 'collapsible', label, fields, admin: { initCollapsed: !open } })

/** Collapsed array rows show their content; lists start folded so long forms stay short. */
export const rowLabel = { components: { RowLabel: '/components/admin/RowLabel#RowLabel' } }
export const listAdmin = (description?: string) => ({ initCollapsed: true, ...rowLabel, ...(description ? { description } : {}) })
/** List-view cell: a tick instead of "true/false". */
export const checkCell = { components: { Cell: '/components/admin/CheckCell#CheckCell' } }
export const checkbox = (name: string, label: string, o?: { description?: string; defaultValue?: boolean; sidebar?: boolean }): Field => ({
  name, type: 'checkbox', label, defaultValue: o?.defaultValue ?? false,
  admin: { ...checkCell, ...(o?.description ? { description: o.description } : {}), ...(o?.sidebar ? { position: 'sidebar' as const } : {}) },
})

export const review: Field = checkbox('enReviewed', 'Teks Inggris sudah dicek', {
  sidebar: true, description: 'Centang setelah versi bahasa Inggris dibaca dan disetujui. Tidak mengubah tampilan situs.',
})
export const seedKey: Field = { name: 'seedKey', type: 'text', unique: true, index: true, admin: { readOnly: true, position: 'sidebar', hidden: true } }
export const seo = (name = 'seo'): Field => collapsible('SEO: judul & deskripsi di Google (opsional)', [
  { name, type: 'group', label: false, admin: { hideGutter: true }, fields: [
    text('title', false, { label: 'Judul di Google', description: 'Kosongkan untuk memakai judul halaman.' }),
    textarea('description', { label: 'Deskripsi di Google', description: '1–2 kalimat, sekitar 150 karakter.' }),
    upload('ogImage', { label: 'Gambar saat dibagikan (WhatsApp, LinkedIn)' }),
  ] },
])
const slugify = (s: string) => s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
export const slug: Field = {
  name: 'slug', type: 'text', required: true, unique: true, index: true, label: 'Alamat halaman (slug)',
  admin: { position: 'sidebar', description: 'Terisi otomatis dari judul. Huruf kecil dan tanda hubung, mis. "airport-escort".' },
  hooks: { beforeValidate: [({ value, siblingData }) => value || (typeof siblingData?.title === 'string' ? slugify(siblingData.title) : value)] },
  validate: (value: unknown) => typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) || 'Gunakan huruf kecil, angka dan tanda hubung.',
}
export const order: Field = { name: 'order', type: 'number', defaultValue: 0, label: 'Urutan tampil', admin: { position: 'sidebar', description: 'Angka kecil tampil lebih dulu.' } }

const iconLabels: Record<string, string> = {
  globe: 'Globe', 'file-text': 'Dokumen', users: 'Orang', 'building-2': 'Gedung', plane: 'Pesawat', briefcase: 'Koper kerja', 'id-card': 'Kartu identitas',
  stamp: 'Stempel', layers: 'Lapisan', sun: 'Matahari', 'monitor-check': 'Monitor', timer: 'Waktu', 'shield-check': 'Perisai', map: 'Peta',
}
export const iconOptions = Object.keys(iconLabels)
export const icon = (name = 'icon', o?: Opts): Field => ({ name, type: 'select', options: iconOptions.map(value => ({ label: iconLabels[value], value })), ...ui({ label: 'Ikon', ...o }) })

/** City pin: name + map picker; lat/lng stay in the data but are set by the picker. */
export const cityPin = (geo: Record<string, number | string>): Field[] => [
  { name: 'name', type: 'text', required: true, label: 'Nama kota', admin: { placeholder: 'mis. Surabaya' } },
  { name: 'mapPicker', type: 'ui', admin: { components: { Field: { path: '/components/admin/CityPointField#CityPointField', clientProps: { geo } } } } },
  { name: 'lat', type: 'number', min: -90, max: 90, required: true, admin: { hidden: true } },
  { name: 'lng', type: 'number', min: -180, max: 180, required: true, admin: { hidden: true } },
]

/** List column with a coloured publish-state label (draft vs live). Display only: a `ui` field stores nothing. */
export const statusColumn: Field = {
  name: 'statusBadge', type: 'ui', label: 'Status tayang',
  admin: { disableListColumn: false, components: { Cell: '/components/admin/StatusCell#StatusCell' } },
}

// Builds the CMS sidebar and the dashboard index from NAV_MAP (nav-map.ts): the sections in the order the team works, each
// link labelled from its collection/global config, filtered by what the user may read, with the count of new messages.
// Anything readable that NAV_MAP does not list lands under "Lainnya", so a new collection never disappears.
import type { CollectionSlug, GlobalSlug, Payload, SanitizedPermissions, TypedUser, Where } from 'payload'
import type { IconName } from './NavIcon'

export type NavMapItem = ({ collection: CollectionSlug } | { global: GlobalSlug }) & { icon: IconName; badge?: Where }
export type NavMap = { label: string; items: NavMapItem[] }[]
export type NavLink = { href: string; label: string; icon: IconName; hint?: string; badge?: number }
export type NavSection = { label: string; links: NavLink[] }

type Args = { map: NavMap; payload: Payload; permissions?: SanitizedPermissions | null; user?: TypedUser | null }
type Entity = { slug: string; admin?: { hidden?: unknown }; fields?: unknown[] }

const text = (label: unknown, fallback: string): string =>
  typeof label === 'string' ? label : label && typeof label === 'object' ? String(Object.values(label)[0] ?? fallback) : fallback

// A page's sections (its tab labels) say what can be changed there; SEO and on/off switches are left out.
const SKIP_TABS = /^(seo|tampilkan bagian)/i
function tabHint(fields: unknown[] = []): string | undefined {
  const tabsField = fields.find((f): f is { type: 'tabs'; tabs: { label?: unknown }[] } => (f as { type?: string }).type === 'tabs')
  const labels = tabsField?.tabs.map(t => text(t.label, '')).filter(l => l && !SKIP_TABS.test(l)) ?? []
  return labels.length ? labels.join(' · ') : undefined
}

export async function resolveNav({ map, payload, permissions, user }: Args): Promise<NavSection[]> {
  const admin = payload.config.routes.admin
  const isVisible = (kind: 'collections' | 'globals', entity: Entity) => {
    const hidden = entity.admin?.hidden
    if (typeof hidden === 'function' ? hidden({ user }) : hidden) return false
    return Boolean((permissions?.[kind] as Record<string, { read?: unknown }> | undefined)?.[entity.slug]?.read)
  }
  const collections = payload.config.collections.filter(c => !c.slug.startsWith('payload-'))
  const globals = payload.config.globals
  const listed = new Set<string>()

  const toLink = async (item: NavMapItem): Promise<NavLink | null> => {
    if ('collection' in item) {
      const config = collections.find(c => c.slug === item.collection)
      listed.add(`collections:${item.collection}`)
      if (!config || !isVisible('collections', config)) return null
      const badge = item.badge
        ? await payload.count({ collection: item.collection, where: item.badge, overrideAccess: true }).then(r => r.totalDocs).catch(() => 0)
        : undefined
      return { href: `${admin}/collections/${config.slug}`, label: text(config.labels?.plural, config.slug), icon: item.icon, badge }
    }
    const config = globals.find(g => g.slug === item.global)
    listed.add(`globals:${item.global}`)
    if (!config || !isVisible('globals', config)) return null
    return { href: `${admin}/globals/${config.slug}`, label: text(config.label, config.slug), icon: item.icon, hint: tabHint(config.fields) }
  }

  const sections: NavSection[] = []
  for (const section of map) {
    const links = (await Promise.all(section.items.map(toLink))).filter((l): l is NavLink => l !== null)
    if (links.length) sections.push({ label: section.label, links })
  }

  const rest: NavLink[] = [
    ...collections.filter(c => !listed.has(`collections:${c.slug}`) && isVisible('collections', c))
      .map(c => ({ href: `${admin}/collections/${c.slug}`, label: text(c.labels?.plural, c.slug), icon: 'file' as const })),
    ...globals.filter(g => !listed.has(`globals:${g.slug}`) && isVisible('globals', g))
      .map(g => ({ href: `${admin}/globals/${g.slug}`, label: text(g.label, g.slug), icon: 'file' as const })),
  ]
  if (rest.length) sections.push({ label: 'Lainnya', links: rest })
  return sections
}

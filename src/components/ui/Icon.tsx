// CMS icon names (src/lib/fields.ts iconOptions) → Lucide components, stroke 2.
import { Briefcase, Building2, FileText, Globe, IdCard, Layers, Map, MonitorCheck, Plane, ShieldCheck, Stamp, Sun, Timer, Users, type LucideIcon } from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  globe: Globe, 'file-text': FileText, users: Users, 'building-2': Building2, plane: Plane, briefcase: Briefcase,
  'id-card': IdCard, stamp: Stamp, layers: Layers, sun: Sun, 'monitor-check': MonitorCheck, timer: Timer,
  'shield-check': ShieldCheck, map: Map,
}

export function Icon({ name, size = 26 }: { name?: string | null; size?: number }) {
  const Glyph = (name && icons[name]) || Globe
  return <Glyph size={size} strokeWidth={2} aria-hidden="true" />
}

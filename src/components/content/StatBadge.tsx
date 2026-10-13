type Stat = { value: string; label: string }

/** design/components/StatBadge — official figures only (site.stats). */
export function StatBadge({ items, variant = 'default' }: { items: Stat[]; variant?: 'default' | 'on-brand' }) {
  if (!items.length) return null
  return (
    <dl className={`ag-stats${variant === 'on-brand' ? ' ag-stats--on-brand' : ''}`}>
      {items.map(s => (
        <div className="ag-stat" key={s.value + s.label}>
          <dt className="ag-visually-hidden">{s.label}</dt>
          <dd><b>{s.value}</b><span aria-hidden="true">{s.label}</span></dd>
        </div>
      ))}
    </dl>
  )
}

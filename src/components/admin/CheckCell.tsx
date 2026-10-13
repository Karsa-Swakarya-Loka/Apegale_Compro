'use client'
// List-view cell for checkbox fields: a tick in a filled circle when checked, an empty box when not
// (instead of Payload's raw "true/false").
export function CheckCell({ cellData }: { cellData?: unknown }) {
  const on = cellData === true
  return (
    <span className={`cms-check${on ? ' cms-check--on' : ''}`} role="img" aria-label={on ? 'Ya' : 'Tidak'} title={on ? 'Ya' : 'Tidak'}>
      {on ? (
        <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true"><path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      ) : null}
    </span>
  )
}

'use client'
// List column "Status": a coloured label instead of plain text, so unpublished items stand out at a glance.
export function StatusCell({ rowData }: { rowData?: { _status?: string | null } }) {
  const live = rowData?._status === 'published'
  return <span className={`cms-status${live ? ' cms-status--live' : ''}`}>{live ? 'Tayang' : 'Draf, belum tayang'}</span>
}

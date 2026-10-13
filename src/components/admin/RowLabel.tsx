'use client'
// Collapsed array rows show their content (title / name / question…) instead of "Item 01", so long lists stay readable.
import { useRowLabel } from '@payloadcms/ui'

const KEYS = ['title', 'name', 'question', 'label', 'value', 'text', 'platform', 'email'] as const

export function RowLabel() {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
  const found = KEYS.map(k => data?.[k]).find(v => typeof v === 'string' && v.trim())
  const n = String((rowNumber ?? 0) + 1).padStart(2, '0')
  return <span className="cms-rowlabel"><b>{n}</b>{typeof found === 'string' ? found.slice(0, 90) : 'Item baru'}</span>
}

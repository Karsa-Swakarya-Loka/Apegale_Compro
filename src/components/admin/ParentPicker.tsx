'use client'
// Organisation chart: choose the superior by name instead of typing a row index. Stores the same number as before
// (index of the superior's row; empty for the director), so the public site's chart is unchanged.
import { useField, useFormFields } from '@payloadcms/ui'

export function ParentPicker({ path }: { path: string }) {
  const m = path.match(/^(.*)\.(\d+)\.parentIndex$/)
  const arrayPath = m?.[1] ?? '', self = Number(m?.[2] ?? -1)
  const { value, setValue } = useField<number | null>({ path })
  const people = useFormFields(([fields]) => {
    const count = Number(fields[arrayPath]?.value ?? 0)
    return Array.from({ length: count }, (_, i) => ({ i, name: String(fields[`${arrayPath}.${i}.name`]?.value ?? '').trim() }))
  })
  return (
    <div className="field-type cms-parentpick">
      <label className="field-label" htmlFor={`${path}-select`}>Atasan langsung</label>
      <select id={`${path}-select`} value={typeof value === 'number' ? String(value) : ''}
        onChange={e => setValue(e.currentTarget.value === '' ? null : Number(e.currentTarget.value))}>
        <option value="">Tidak ada (pimpinan tertinggi)</option>
        {people.filter(p => p.i !== self).map(p => <option key={p.i} value={p.i}>{p.name || `Orang ke-${p.i + 1} (belum diberi nama)`}</option>)}
      </select>
      <p className="cms-help">Pilih nama atasannya. Kosongkan hanya untuk direktur.</p>
    </div>
  )
}

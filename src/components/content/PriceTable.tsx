import Link from 'next/link'

type Row = { id: string; name: string; note?: string | null; duration?: string | null; priceFrom?: number | null; featured?: boolean | null; service?: string; href?: string }
type Labels = { service: string; duration: string; from: string; contact: string }
type Props = { rows: Row[]; labels: Labels; locale: 'id' | 'en'; note?: string | null; updated?: { label: string; date?: string | null } }

/**
 * design/components/PriceTable — real CMS rows only (decision: prices come from the client).
 * Empty priceFrom shows "Hubungi kami"; an empty table renders nothing.
 */
export function PriceTable({ rows, labels, locale, note, updated }: Props) {
  if (!rows.length) return null
  const money = new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-US', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
  const when = updated?.date ? new Date(updated.date).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null
  return (
    <div className="ag-pricewrap">
      <div className="ag-scroll">
        <table className="ag-price">
          <thead><tr><th scope="col">{labels.service}</th><th scope="col">{labels.duration}</th><th scope="col">{labels.from}</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className={r.featured ? 'is-featured' : undefined}>
                <td>
                  {r.href ? <Link href={r.href}>{r.name}</Link> : r.name}
                  {r.service && r.service !== r.name ? <small>{r.service}</small> : null}
                  {r.note ? <small>{r.note}</small> : null}
                </td>
                <td>{r.duration || '-'}</td>
                <td>{typeof r.priceFrom === 'number' ? money.format(r.priceFrom) : labels.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note || when ? <p className="ag-pricewrap__note">{[note, when ? `${updated?.label} ${when}` : null].filter(Boolean).join(' · ')}</p> : null}
    </div>
  )
}

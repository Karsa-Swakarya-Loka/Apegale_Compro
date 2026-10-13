import { Plus } from 'lucide-react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Faq } from '@/payload-types'
import { faqLd } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'

/** design/components/FAQ — native details/summary (works without JavaScript); first item open, opening one closes the others. FAQPage JSON-LD
 *  is built from exactly these items. */
export function FAQList({ items }: { items: Faq[] }) {
  if (!items.length) return null
  // Exclusive accordion: details sharing a name close each other natively (no JS). One group per list on the page.
  const group = `faq-${items[0].id}`
  return (
    <div className="ag-faq">
      <JsonLd data={faqLd(items)} />
      {items.map((f, i) => (
        <details key={f.id} name={group} open={i === 0}>
          <summary>{f.question}<Plus size={20} aria-hidden="true" /></summary>
          {f.answer ? <div className="ag-faq__answer"><RichText data={f.answer} /></div> : null}
        </details>
      ))}
    </div>
  )
}

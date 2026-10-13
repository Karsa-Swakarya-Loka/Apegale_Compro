import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/BrandIcons'
import { SectionHeading } from '@/components/ui/SectionHeading'

type Props = {
  title: string
  highlight?: string
  text: string
  primary: { label: string; href?: string }
  secondary?: { label: string; href: string }
}

/** Closing band on inner pages (design v10): red-gradient field, two-tone title and text left, WhatsApp (primary) and
 *  the consultation link (secondary) right. */
export function CtaBanner({ title, highlight, text, primary, secondary }: Props) {
  return (
    <section className="ag-closing ag-closing--banner ag-red" aria-labelledby="cta-title">
      <div className="ag-container ag-closing__in">
        <SectionHeading id="cta-title" title={title} highlight={highlight} intro={text} />
        <div className="ag-row">
          {primary.href ? <Button variant="wa" href={primary.href} label={primary.label} icon={<WhatsAppIcon size={20} />} /> : null}
          {secondary ? <Button variant="outline" href={secondary.href} label={secondary.label} icon={<ArrowRight size={18} aria-hidden="true" />} /> : null}
        </div>
      </div>
      <span className="ag-wedge" aria-hidden="true" />
    </section>
  )
}

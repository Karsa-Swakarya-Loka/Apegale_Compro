import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/BrandIcons'

type Props = {
  title: string
  text: string
  primary: { label: string; href?: string }
  secondary?: { label: string; href: string }
}

/** Template slide 10 on inner pages: copy and actions left; a grey organic blob with the red brand card on the right. */
export function CtaBanner({ title, text, primary, secondary }: Props) {
  return (
    <section className="ag-closing ag-closing--banner" aria-labelledby="cta-title">
      <div className="ag-container ag-closing__in">
        <div className="ag-closing__copy">
          <h2 id="cta-title">{title}</h2>
          <p>{text}</p>
          <div className="ag-row">
            {primary.href ? <Button variant="wa" href={primary.href} label={primary.label} icon={<WhatsAppIcon size={20} />} /> : null}
            {secondary ? <Button variant="outline" href={secondary.href} label={secondary.label} icon={<ArrowRight size={18} aria-hidden="true" />} /> : null}
          </div>
        </div>
        <div className="ag-closing__media" aria-hidden="true">
          <span className="ag-closing__blob" />
          <span className="ag-closing__card"><Image src="/brand/apegale-mark.png" alt="" width={56} height={56} /></span>
        </div>
      </div>
    </section>
  )
}

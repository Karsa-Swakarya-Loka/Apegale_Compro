import type { ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { WhatsAppIcon } from '@/components/ui/BrandIcons'

type Props = { title: string; text: string; chatLabel: string; whatsapp?: string; form: ReactNode }

/** Template slide 10 "Ready to transform together?": closing copy on the left, the short form on a large
 *  organic blob on the right with a red accent card tucked under its corner. */
export function ContactCta({ title, text, chatLabel, whatsapp, form }: Props) {
  return (
    <section className="ag-closing" aria-labelledby="contact-cta-title">
      <div className="ag-container ag-closing__in">
        <div className="ag-closing__copy">
          <h2 id="contact-cta-title">{title}</h2>
          <p>{text}</p>
          {whatsapp ? <div className="ag-row"><Button variant="wa" href={whatsapp} label={chatLabel} icon={<WhatsAppIcon size={20} />} /></div> : null}
        </div>
        <div className="ag-closing__media">
          <span className="ag-closing__blob" aria-hidden="true" />
          <span className="ag-closing__accent" aria-hidden="true" />
          <div className="ag-closing__form">{form}</div>
        </div>
      </div>
    </section>
  )
}

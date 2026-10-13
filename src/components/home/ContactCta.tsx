import type { ReactNode } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/BrandIcons'
import { SectionHeading } from '@/components/ui/SectionHeading'

export type ContactLine = { kind: 'phone' | 'whatsapp' | 'email' | 'address'; label: string; value: string; href?: string }
type Props = { title: string; highlight?: string; text: string; contacts: ContactLine[]; form: ReactNode }

const icons = {
  phone: <Phone size={18} aria-hidden="true" />, whatsapp: <WhatsAppIcon size={18} />,
  email: <Mail size={18} aria-hidden="true" />, address: <MapPin size={18} aria-hidden="true" />,
}

/** Closing (design v10): red-gradient field, two-tone title, the direct contact lines on the left and the short form on
 *  a white panel on the right. The form's submit is the one primary action. */
export function ContactCta({ title, highlight, text, contacts, form }: Props) {
  return (
    <section className="ag-closing ag-red" aria-labelledby="contact-cta-title">
      <div className="ag-container ag-closing__in">
        <div className="ag-closing__copy">
          <SectionHeading id="contact-cta-title" title={title} highlight={highlight} intro={text} />
          {contacts.length ? (
            <ul className="ag-contactlines">
              {contacts.map(c => (
                <li key={c.kind}>
                  <span className="ag-contactlines__icon">{icons[c.kind]}</span>
                  <span className="ag-visually-hidden">{c.label}: </span>
                  {c.href
                    ? <a href={c.href} {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{c.value}</a>
                    : <span>{c.value}</span>}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="ag-closing__form">{form}</div>
      </div>
      <span className="ag-wedge" aria-hidden="true" />
    </section>
  )
}

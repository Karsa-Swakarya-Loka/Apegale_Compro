'use client'
// design/components/ContactForm — compact (Home) and full (Hubungi Kami) variants on one server action.
// Works without JavaScript (plain form post); with JS it shows pending/success/error inline.
import { useActionState, useEffect, useRef } from 'react'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { submitInquiry, type InquiryState } from '@/app/actions/inquiry'
import type { Locale } from '@/i18n/config'
import type { FieldError } from '@/lib/inquiry'

export type FormLabels = {
  title?: string; name: string; company: string; email: string; whatsapp: string; service: string; message: string
  selectService: string; send: string; sending: string; success: string; sendAnother: string; optional: string
  errors: Record<FieldError | 'rate' | 'server' | 'summary', string>
}
type Props = { variant: 'compact' | 'full'; locale: Locale; services: { value: string; label: string }[]; labels: FormLabels; idPrefix: string }

const initial: InquiryState = { status: 'idle' }

export function ContactForm({ variant, locale, services, labels, idPrefix }: Props) {
  const [state, formAction, pending] = useActionState(submitInquiry, initial)
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const errors = state.status === 'error' ? state.errors ?? {} : {}

  useEffect(() => {
    if (state.status === 'success') { formRef.current?.reset(); statusRef.current?.focus() }
    if (state.status === 'error') {
      const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')
      ;(first ?? statusRef.current)?.focus()
    }
  }, [state])

  const id = (f: string) => `${idPrefix}-${f}`
  const field = (name: keyof typeof labels & string, input: React.ReactNode, opts: { full?: boolean; optional?: boolean } = {}) => {
    const err = errors[name as keyof typeof errors]
    return (
      <div className={`ag-field${opts.full ? ' ag-field--full' : ''}`} data-invalid={err ? '' : undefined}>
        <label htmlFor={id(name)}>{labels[name] as string}{opts.optional ? <span className="ag-field__optional"> ({labels.optional})</span> : null}</label>
        {input}
        {err ? <span className="ag-field__error" id={id(`${name}-err`)}><AlertCircle size={16} aria-hidden="true" />{name === 'email' && err === 'email' ? labels.errors.email : labels.errors[err]}</span> : null}
      </div>
    )
  }
  const aria = (name: string) => (errors[name as keyof typeof errors] ? { 'aria-invalid': true as const, 'aria-describedby': id(`${name}-err`) } : {})

  return (
    <form ref={formRef} action={formAction} className={`ag-form${variant === 'compact' ? ' ag-form--compact' : ''}`} noValidate
      aria-labelledby={labels.title ? id('title') : undefined}>
      {labels.title ? <h3 id={id('title')} className="ag-field--full">{labels.title}</h3> : null}
      <input type="hidden" name="variant" value={variant} />
      <input type="hidden" name="locale" value={locale} />
      <div className="ag-hp" aria-hidden="true"><label htmlFor={id('website')}>Website</label><input id={id('website')} name="website" tabIndex={-1} autoComplete="off" /></div>

      {field('name', <input id={id('name')} name="name" autoComplete="name" required maxLength={100} {...aria('name')} />)}
      {variant === 'full' ? field('company', <input id={id('company')} name="company" autoComplete="organization" maxLength={150} {...aria('company')} />, { optional: true }) : null}
      {variant === 'full' ? field('email', <input id={id('email')} name="email" type="email" autoComplete="email" required {...aria('email')} />) : null}
      {field('whatsapp', <input id={id('whatsapp')} name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" required {...aria('whatsapp')} />)}
      {field('service', (
        <select id={id('service')} name="service" required defaultValue="" {...aria('service')}>
          <option value="" disabled>{labels.selectService}</option>
          {services.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      ), { full: true })}
      {field('message', <textarea id={id('message')} name="message" rows={variant === 'compact' ? 3 : 5} required maxLength={2000} {...aria('message')} />, { full: true })}

      <div className="ag-field--full ag-form__actions">
        <button className="ag-btn ag-btn--primary" type="submit" disabled={pending} aria-disabled={pending || undefined}>
          {pending ? labels.sending : labels.send}
        </button>
      </div>
      <div ref={statusRef} tabIndex={-1} className="ag-field--full ag-form__status" role="status" aria-live="polite">
        {state.status === 'success' ? <p className="ag-form__ok"><CheckCircle2 size={20} aria-hidden="true" />{labels.success}</p> : null}
        {state.status === 'error' ? (
          <p className="ag-form__fail"><AlertCircle size={20} aria-hidden="true" />
            {state.reason === 'rate' ? labels.errors.rate : state.reason === 'server' ? labels.errors.server : labels.errors.summary}
          </p>
        ) : null}
      </div>
    </form>
  )
}

// Pure helpers for the inquiry form: field validation, rate limiting, duplicate detection.
// Kept free of Payload/Next imports so they can be unit-tested directly.
import { validPhone } from './validation.ts'

export type Variant = 'compact' | 'full'
export type InquiryInput = { variant: Variant; name: string; company: string; email: string; whatsapp: string; service: string; message: string; website: string }
export type FieldError = 'required' | 'email' | 'phone' | 'service' | 'tooLong' | 'tooShort'
export type Errors = Partial<Record<keyof InquiryInput, FieldError>>

const text = (v: FormDataEntryValue | null) => (typeof v === 'string' ? v.trim() : '')

export function readInquiry(form: FormData): InquiryInput {
  return {
    variant: text(form.get('variant')) === 'compact' ? 'compact' : 'full',
    name: text(form.get('name')), company: text(form.get('company')), email: text(form.get('email')),
    whatsapp: text(form.get('whatsapp')), service: text(form.get('service')), message: text(form.get('message')),
    website: text(form.get('website')), // honeypot: real people never fill it
  }
}

/** Required: name, WhatsApp, service, message (both variants); email only on the full form (decision #19). */
export function validateInquiry(input: InquiryInput, serviceSlugs: string[]): Errors {
  const e: Errors = {}
  if (!input.name) e.name = 'required'
  else if (input.name.length > 100) e.name = 'tooLong'
  if (!input.whatsapp) e.whatsapp = 'required'
  else if (!validPhone(input.whatsapp)) e.whatsapp = 'phone'
  if (!input.service) e.service = 'required'
  else if (!serviceSlugs.includes(input.service)) e.service = 'service'
  if (!input.message) e.message = 'required'
  else if (input.message.length < 10) e.message = 'tooShort'
  else if (input.message.length > 2000) e.message = 'tooLong'
  if (input.variant === 'full' && !input.email) e.email = 'required'
  else if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email)) e.email = 'email'
  if (input.company.length > 150) e.company = 'tooLong'
  return e
}

/** Sliding-window limiter per key (client IP). In-memory: enough for one Node process. */
export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>()
  return (key: string, now = Date.now()) => {
    const recent = (hits.get(key) ?? []).filter(t => now - t < windowMs)
    if (recent.length >= max) { hits.set(key, recent); return false }
    recent.push(now); hits.set(key, recent)
    return true
  }
}

/** Same WhatsApp + message inside the window counts as a double submit, not a new inquiry. */
export function duplicateKey(input: InquiryInput) {
  return `${input.whatsapp.replace(/\D/g, '')}|${input.message.trim().toLowerCase().replace(/\s+/g, ' ')}`
}

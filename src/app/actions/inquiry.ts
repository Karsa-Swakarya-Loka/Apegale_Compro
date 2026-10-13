'use server'
// Inquiry form handler (Hubungi Kami + Home short form). Order: honeypot → validation → duplicate check →
// rate limit → save inquiry → notify by email. The inquiry is saved even if email fails;
// emailStatus records what really happened (decision #19).
import { headers } from 'next/headers'
import type { Locale } from '@/i18n/config'
import { createRateLimiter, duplicateKey, readInquiry, validateInquiry, type Errors } from '@/lib/inquiry'
import { getSite, payloadClient } from '@/lib/cms'

export type InquiryState = { status: 'idle' | 'success' | 'error'; errors?: Errors; reason?: 'rate' | 'server' }

const limiter = createRateLimiter(5, 10 * 60 * 1000)
const recent = new Map<string, number>()
const DUPLICATE_WINDOW = 10 * 60 * 1000

// Locale comes from a hidden field, not .bind(): a bound action re-created on every render sends React's
// no-JS form-state replay into an endless loop on the server.
export async function submitInquiry(_prev: InquiryState, form: FormData): Promise<InquiryState> {
  const locale: Locale = form.get('locale') === 'en' ? 'en' : 'id'
  const input = readInquiry(form)
  if (input.website) return { status: 'success' } // bot: pretend success, store nothing

  const payload = await payloadClient()
  const { docs: services } = await payload.find({ collection: 'services', draft: false, overrideAccess: false, depth: 0, limit: 200,
    where: { _status: { equals: 'published' } }, select: { slug: true } })
  const errors = validateInquiry(input, services.map(s => s.slug))
  if (Object.keys(errors).length) return { status: 'error', errors }

  const key = duplicateKey(input)
  const last = recent.get(key)
  if (last && Date.now() - last < DUPLICATE_WINDOW) return { status: 'success' }

  // Only submissions that would be stored count towards the limit, so fixing typos never locks anyone out.
  const h = await headers()
  const ip = (h.get('x-forwarded-for') || h.get('x-real-ip') || 'local').split(',')[0].trim()
  if (!limiter(ip)) return { status: 'error', reason: 'rate' }

  try {
    const serviceDoc = services.find(s => s.slug === input.service)!
    const inquiry = await payload.create({ collection: 'inquiries', overrideAccess: true, data: {
      name: input.name, company: input.company || undefined, email: input.email || undefined, whatsapp: input.whatsapp,
      service: serviceDoc.id, message: input.message, locale, variant: input.variant, status: 'baru', emailStatus: 'pending',
    } })
    recent.set(key, Date.now())

    // Without SMTP, Payload only logs emails to the console; record that as failed rather than sent.
    let emailStatus: 'sent' | 'failed' = 'failed'
    if (process.env.SMTP_HOST) {
      try {
        const site = await getSite('id')
        const to = site.email || process.env.SMTP_FROM_ADDRESS
        if (to) {
          await payload.sendEmail({
            to, replyTo: input.email || undefined,
            subject: `[Website] Pertanyaan baru dari ${input.name}`,
            text: [
              `Nama: ${input.name}`, `Perusahaan: ${input.company || '-'}`, `Email: ${input.email || '-'}`, `WhatsApp: ${input.whatsapp}`,
              `Layanan: ${input.service}`, `Bahasa: ${locale.toUpperCase()}`, `Formulir: ${input.variant}`, '', input.message, '',
              `Lihat di admin: ${process.env.NEXT_PUBLIC_SITE_URL || ''}/admin/collections/inquiries/${inquiry.id}`,
            ].join('\n'),
          })
          emailStatus = 'sent'
        }
      } catch (err) {
        payload.logger.error({ err, msg: 'Inquiry email failed' })
      }
    }
    await payload.update({ collection: 'inquiries', id: inquiry.id, overrideAccess: true, data: { emailStatus } })
    return { status: 'success' }
  } catch (err) {
    payload.logger.error({ err, msg: 'Inquiry could not be saved' })
    return { status: 'error', reason: 'server' }
  }
}

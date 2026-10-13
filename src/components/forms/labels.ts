// Builds ContactForm labels from the CMS `ui` global plus shell messages (both locales).
import type { Ui } from '@/payload-types'
import type { Messages } from '@/i18n/messages'
import type { FormLabels } from './ContactForm'

export function formLabels(ui: Ui, m: Messages, title?: string): FormLabels {
  const f = ui.form ?? {}
  return {
    title, name: f.name || '', company: f.company || '', email: f.email || '', whatsapp: f.whatsapp || '', service: f.service || '',
    message: f.message || '', selectService: m.home.selectService, send: ui.cta?.send || '', sending: m.form.sending,
    success: f.success || '', sendAnother: m.form.sendAnother, optional: m.form.optional,
    errors: {
      required: f.errorRequired || '', email: f.errorEmail || '', phone: m.form.errorPhone, service: m.form.errorService,
      tooShort: m.form.errorTooShort, tooLong: m.form.errorTooLong, rate: m.form.errorRate, server: m.form.errorServer, summary: m.form.errorSummary,
    },
  }
}

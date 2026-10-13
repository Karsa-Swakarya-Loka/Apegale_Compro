/** wa.me link for a digits-only Indonesian number (e.g. 628119996286) with an optional prefilled message. */
export function whatsappHref(number: string | null | undefined, message?: string | null): string | undefined {
  const digits = String(number ?? '').replace(/\D/g, '')
  if (!digits) return undefined
  return `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`
}

/** tel: link from a display number such as "(021) 5092 8670". */
export function telHref(display: string | null | undefined): string | undefined {
  const digits = String(display ?? '').replace(/\D/g, '')
  if (!digits) return undefined
  return `tel:+62${digits.replace(/^0/, '')}`
}

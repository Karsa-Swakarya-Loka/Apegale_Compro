export function hasConsentForStatus(status: unknown, consent: unknown): boolean {
  return status !== 'published' || consent === true
}
export function emailRequired(variant: unknown, email: unknown): boolean {
  return variant !== 'full' || (typeof email === 'string' && email.trim().length > 0)
}
export function validPhone(value: unknown): boolean {
  return typeof value === 'string' && /^\+?[0-9 ()-]{8,24}$/.test(value)
}
export function httpUrl(value: unknown): true | string {
  if (!value) return true
  try { const url = new URL(String(value)); if (['http:', 'https:'].includes(url.protocol)) return true } catch { /* Invalid URL: return the validation message below. */ }
  return 'Gunakan URL http atau https yang lengkap.'
}

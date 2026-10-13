export const locales = ['id', 'en'] as const
export type Locale = (typeof locales)[number]
export const localization = {
  locales: [{ code: 'id', label: 'Bahasa Indonesia' }, { code: 'en', label: 'English' }],
  defaultLocale: 'id', fallback: true,
}

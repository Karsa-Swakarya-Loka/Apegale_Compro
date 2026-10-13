'use client'
// design/components/LanguageToggle — pill ID | EN. Moves to the same page in the other
// language with client navigation (no full reload) and remembers the choice.
import { usePathname, useRouter } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'
import { localeFromPath, switchLocalePath } from '@/i18n/routes'

export const LANGUAGE_STORAGE_KEY = 'apegale-language'

type Props = { label: string; variant?: 'default' | 'on-dark'; className?: string }

export function LanguageToggle({ label, variant = 'default', className }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const current = localeFromPath(pathname)

  function choose(target: Locale) {
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, target) } catch { /* storage blocked: preference is optional */ }
    if (target === current) return
    // <html lang> follows the new URL through LanguageSync.
    router.push(switchLocalePath(pathname, target, window.location.search, window.location.hash))
  }

  return (
    <div className={['ag-lang', variant === 'on-dark' ? 'ag-lang--on-dark' : '', className].filter(Boolean).join(' ')}
      role="group" aria-label={label}>
      {locales.map(l => (
        <button key={l} type="button" lang={l} aria-pressed={l === current} onClick={() => choose(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

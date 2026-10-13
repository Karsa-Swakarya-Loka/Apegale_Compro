import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'ghost' | 'wa' | 'light'
type Props = {
  label: ReactNode
  href?: string
  variant?: Variant
  size?: 'default' | 'sm'
  icon?: ReactNode
  /** Feature not available yet (e.g. GARIS login): rendered as non-interactive with aria-disabled. */
  disabled?: boolean
  type?: 'button' | 'submit'
  className?: string
}

/** design/components/Button — one primary per view; outline/ghost for the rest. */
export function Button({ label, href, variant = 'primary', size = 'default', icon, disabled, type = 'button', className }: Props) {
  const cls = ['ag-btn', disabled ? '' : `ag-btn--${variant}`, size === 'sm' ? 'ag-btn--sm' : '', className].filter(Boolean).join(' ')
  const content = <>{label}{icon}</>
  if (disabled) return <span className={cls} aria-disabled="true">{content}</span>
  if (!href) return <button type={type} className={cls}>{content}</button>
  const external = /^(https?:|tel:|mailto:)/.test(href)
  return external
    ? <a className={cls} href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{content}</a>
    : <Link className={cls} href={href}>{content}</Link>
}

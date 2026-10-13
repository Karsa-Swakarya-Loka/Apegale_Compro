import { WhatsAppIcon } from '@/components/ui/BrandIcons'

type Props = { href?: string; label: string }

/** design/components/WhatsAppFloat — fixed bottom-right; icon-only below 768px. */
export function WhatsAppFloat({ href, label }: Props) {
  if (!href) return null
  return (
    <a className="ag-wa ag-wa--float" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <WhatsAppIcon />
      <span className="ag-wa__label" aria-hidden="true">{label}</span>
    </a>
  )
}

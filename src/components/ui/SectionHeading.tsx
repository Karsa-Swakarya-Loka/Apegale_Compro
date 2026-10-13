type Props = {
  eyebrow?: string | null
  title: string
  /** One phrase inside `title` rendered in brand colour (max one per heading). */
  highlight?: string | null
  intro?: string | null
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  id?: string
}

/** Split a title around its highlight phrase. A phrase at the end drops to its own line, like the
 *  template's two-tone titles ("WHO / WE ARE"); a phrase elsewhere stays inline. */
export function highlightTitle(title: string, highlight?: string | null) {
  const at = highlight ? title.indexOf(highlight) : -1
  if (at < 0 || !highlight) return { node: title, split: false }
  const split = at > 0 && at + highlight.length === title.length
  return {
    node: <>{title.slice(0, at)}<em>{highlight}</em>{title.slice(at + highlight.length)}</>,
    split,
  }
}

/** design/components/SectionHeading — eyebrow → heading (with accent bar) → intro. */
export function SectionHeading({ eyebrow, title, highlight, intro, align = 'left', as: Tag = 'h2', id }: Props) {
  const { node, split } = highlightTitle(title, highlight)
  const cls = ['ag-sechead', align === 'center' ? 'ag-sechead--center' : '', split ? 'ag-sechead--split' : ''].filter(Boolean).join(' ')
  return (
    <div className={cls}>
      {eyebrow && eyebrow.toLocaleLowerCase() !== title.toLocaleLowerCase() ? <span className="ag-eyebrow">{eyebrow}</span> : null}
      <Tag id={id}>{node}</Tag>
      {intro ? <p>{intro}</p> : null}
    </div>
  )
}

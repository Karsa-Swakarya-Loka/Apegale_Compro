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

/** design/components/SectionHeading — eyebrow → heading → intro. */
export function SectionHeading({ eyebrow, title, highlight, intro, align = 'left', as: Tag = 'h2', id }: Props) {
  const at = highlight ? title.indexOf(highlight) : -1
  const heading = at < 0 || !highlight ? title : (
    <>{title.slice(0, at)}<em>{highlight}</em>{title.slice(at + highlight.length)}</>
  )
  return (
    <div className={`ag-sechead${align === 'center' ? ' ag-sechead--center' : ''}`}>
      {eyebrow && eyebrow.toLocaleLowerCase() !== title.toLocaleLowerCase() ? <span className="ag-eyebrow">{eyebrow}</span> : null}
      <Tag id={id}>{heading}</Tag>
      {intro ? <p>{intro}</p> : null}
    </div>
  )
}

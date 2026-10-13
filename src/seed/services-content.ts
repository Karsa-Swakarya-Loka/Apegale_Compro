// Service body migration: content/seed/services-content.json → Lexical rich text in both locales.
// Pure helpers live here (tested); scripts/migrate-services-content.ts performs the CMS writes.

export type Block = { p: string } | { h2: string } | { h3: string } | { ul: string[] }
export type ServiceContent = { status: 'published' | 'draft'; source: string; verify?: string; id: Block[]; en: Block[] }
export type ServicesContentFile = { services: Record<string, ServiceContent> }

/** "Plain **bold** plain" → Lexical text nodes (format 1 = bold). */
function textNodes(value: string) {
  return value.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(part => {
    const bold = part.startsWith('**') && part.endsWith('**')
    return { type: 'text', version: 1, detail: 0, format: bold ? 1 : 0, mode: 'normal', style: '', text: bold ? part.slice(2, -2) : part }
  })
}

const base = { version: 1, direction: 'ltr' as const, format: '' as const, indent: 0 }

function blockNode(block: Block) {
  if ('p' in block) return { ...base, type: 'paragraph', textFormat: 0, textStyle: '', children: textNodes(block.p) }
  if ('h2' in block) return { ...base, type: 'heading', tag: 'h2', children: textNodes(block.h2) }
  if ('h3' in block) return { ...base, type: 'heading', tag: 'h3', children: textNodes(block.h3) }
  return {
    ...base, type: 'list', listType: 'bullet', tag: 'ul', start: 1,
    children: block.ul.map((item, i) => ({ ...base, type: 'listitem', value: i + 1, children: textNodes(item) })),
  }
}

export function toLexical(blocks: Block[]) {
  return { root: { ...base, type: 'root', children: blocks.map(blockNode) } }
}

/** Basic sanity: both locales present and structurally parallel (same block kinds in the same order). */
export function validateContent(file: ServicesContentFile): string[] {
  const problems: string[] = []
  for (const [slug, c] of Object.entries(file.services)) {
    if (!['published', 'draft'].includes(c.status)) problems.push(`${slug}: unknown status ${c.status}`)
    if (!c.id?.length || !c.en?.length) { problems.push(`${slug}: missing id or en blocks`); continue }
    const kinds = (b: Block[]) => b.map(x => Object.keys(x)[0]).join(',')
    if (kinds(c.id) !== kinds(c.en)) problems.push(`${slug}: id/en block structure differs`)
    c.id.forEach((b, i) => {
      const other = c.en[i]
      if (other && 'ul' in b && 'ul' in other && b.ul.length !== other.ul.length) problems.push(`${slug}: list ${i} has ${b.ul.length} id vs ${other.ul.length} en items`)
    })
  }
  for (const [slug, c] of Object.entries(file.services))
    if (c.status === 'draft' && !c.verify) problems.push(`${slug}: draft needs a "verify" note`)
  return problems
}

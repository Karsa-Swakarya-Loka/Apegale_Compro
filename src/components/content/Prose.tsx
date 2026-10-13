import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/** CMS rich text with the site's reading styles (headings, lists, 68ch measure). */
export function Prose({ data }: { data?: unknown }) {
  if (!data || typeof data !== 'object' || !('root' in data)) return null
  return <div className="ag-prose"><RichText data={data as SerializedEditorState} /></div>
}

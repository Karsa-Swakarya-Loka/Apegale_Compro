// Auto-translation for testimonials: the client writes a quote once, in Indonesian or English, and the other language is
// generated on save. Indonesian is the master: an English text is never allowed to overwrite a non-empty Indonesian one.
export type L = 'id' | 'en'
export type Fields = { quote?: string | null; role?: string | null }
export type Translation = { lang: L; quote: Record<L, string>; role?: Record<L, string> }
export type Writes = Partial<Record<L, Fields>>

const MODEL = 'claude-haiku-5-5'

/** Translate (and detect the language of) a quote and optional job title. Returns null when no key is configured or the
 *  call fails: the page then falls back to the original text, so nothing disappears. */
export async function translatePair(src: { quote: string; role?: string | null }, fetchImpl: typeof fetch = fetch): Promise<Translation | null> {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return null
  const base = (process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com').replace(/\/$/, '')
  const prompt = `You translate client testimonials for an Indonesian immigration and expatriate-permit consultancy.
Detect whether the texts below are Indonesian ("id") or English ("en"), then return both versions.
Keep the voice, meaning and tone; do not add, remove or soften anything. Keep names, company names and numbers unchanged.
Reply with JSON only, no markdown: {"lang":"id"|"en","quote":{"id":"...","en":"..."},"role":{"id":"...","en":"..."}}
Omit "role" when no job title is given.

quote: ${JSON.stringify(src.quote)}
role: ${JSON.stringify(src.role ?? '')}`
  try {
    const res = await fetchImpl(`${base}/v1/messages`, {
      method: 'POST', signal: AbortSignal.timeout(25_000),
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: MODEL, max_tokens: 2000, messages: [{ role: 'user', content: prompt }] }),
    })
    if (!res.ok) { console.error('[translate] HTTP', res.status); return null }
    const body = await res.json() as { content?: { type: string; text?: string }[] }
    const raw = body.content?.find(c => c.type === 'text')?.text ?? ''
    const json = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1)) as Translation
    const ok = (v: unknown) => typeof v === 'string' && v.trim().length > 0
    if ((json.lang !== 'id' && json.lang !== 'en') || !ok(json.quote?.id) || !ok(json.quote?.en)) return null
    return { lang: json.lang, quote: json.quote, ...(src.role && ok(json.role?.id) && ok(json.role?.en) ? { role: json.role } : {}) }
  } catch (e) {
    console.error('[translate] failed:', e instanceof Error ? e.message : e)
    return null
  }
}

/** Decide which locales to write after a save made in locale `saved`.
 *  - an empty locale is always filled;
 *  - text typed in the wrong locale (English under "id" or the reverse) is moved to the right one;
 *  - on an edit in Indonesian, the English version is regenerated unless "Teks Inggris sudah dicek" is ticked;
 *  - an edit in English never overwrites existing Indonesian text. */
export function planWrites(o: { saved: L; changed: boolean; enReviewed: boolean; current: Record<L, Fields>; tr: Translation }): Writes {
  const out: Writes = {}
  for (const field of ['quote', 'role'] as const) {
    const wanted = o.tr[field]
    if (!wanted) continue
    for (const t of ['id', 'en'] as const) {
      const next = wanted[t]
      const now = o.current[t][field]
      if (!next || next === now) continue
      const empty = !now
      const misfiled = t === o.saved && o.tr.lang !== o.saved
      const fromOther = t !== o.saved
      const regenerate = o.changed && (misfiled || fromOther) && !(t === 'en' && o.enReviewed) && !(t === 'id' && o.saved === 'en' && !misfiled)
      if (empty || regenerate) out[t] = { ...out[t], [field]: next }
    }
  }
  return out
}

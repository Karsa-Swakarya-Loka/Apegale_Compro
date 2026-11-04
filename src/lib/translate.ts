// Auto-translation for testimonials: the client writes a quote once, in Indonesian or English, and the other language is
// generated on save. Indonesian is the master: an English text is never allowed to overwrite a non-empty Indonesian one.
export type L = 'id' | 'en'
export type Fields = { quote?: string | null; role?: string | null }
export type Translation = { lang: L; quote: Record<L, string>; role?: Record<L, string> }
export type Writes = Partial<Record<L, Fields>>

const MODEL = 'claude-haiku-5-5'

const ID_WORDS = new Set('yang dan saya kami kita dengan untuk tidak ini itu di ke dari pada sangat terima kasih anda layanan pelayanan bisa akan sudah juga atau karena ada mereka proses tim bantuan sangat puas ramah cepat dalam jika adalah telah oleh kepada agar sehingga namun tetapi hasil membantu mengurus pengurusan'.split(' '))
const EN_WORDS = new Set('the and i we you with for not this that of to in from on very thank thanks service team can will have has also or because there they process help was is are were my our your if been by at as so but great fast friendly satisfied again would'.split(' '))
/** Cheap language guess for a short testimonial: Indonesian unless clearly English. */
export function guessLang(text: string): L {
  let id = 0, en = 0
  for (const w of text.toLowerCase().match(/[a-z]+/g) ?? []) { if (ID_WORDS.has(w)) id++; if (EN_WORDS.has(w)) en++ }
  return en > id ? 'en' : 'id'
}

/** Split into pieces of at most `max` characters, on sentence ends where possible (MyMemory takes ~500 bytes per request). */
function chunks(text: string, max = 400): string[] {
  const out: string[] = []
  let cur = ''
  for (const s of text.split(/(?<=[.!?])\s+/)) {
    if (cur && (cur + ' ' + s).length > max) { out.push(cur); cur = s } else cur = cur ? cur + ' ' + s : s
    while (cur.length > max) { out.push(cur.slice(0, max)); cur = cur.slice(max) }
  }
  if (cur) out.push(cur)
  return out
}

/** Keyless fallback: MyMemory's public translation API (free, no account, about 5,000 characters per day per IP). Used only
 *  while ANTHROPIC_API_KEY is not set. Plain machine translation: fine for a first version, which staff can polish and then
 *  protect with "Teks Inggris sudah dicek". */
async function translateKeyless(src: { quote: string; role?: string | null }, fetchImpl: typeof fetch): Promise<Translation | null> {
  const lang = guessLang(src.quote)
  const other: L = lang === 'id' ? 'en' : 'id'
  const call = async (text: string): Promise<string | null> => {
    const parts: string[] = []
    for (const piece of chunks(text)) {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(piece)}&langpair=${lang}|${other}`
      const res = await fetchImpl(url, { signal: AbortSignal.timeout(15_000) })
      if (!res.ok) return null
      const body = await res.json() as { responseStatus?: number | string; quotaFinished?: boolean; responseData?: { translatedText?: string } }
      const out = body.responseData?.translatedText?.trim()
      if (Number(body.responseStatus) !== 200 || body.quotaFinished || !out || /MYMEMORY WARNING/i.test(out)) return null
      parts.push(out)
    }
    return parts.join(' ') || null
  }
  try {
    const q = await call(src.quote)
    if (!q) return null
    const quote = { [lang]: src.quote, [other]: q } as Record<L, string>
    const r = src.role ? await call(src.role) : null
    return { lang, quote, ...(r ? { role: { [lang]: src.role, [other]: r } as Record<L, string> } : {}) }
  } catch (e) {
    console.error('[translate] keyless failed:', e instanceof Error ? e.message : e)
    return null
  }
}

/** Translate (and detect the language of) a quote and optional job title: with Claude when ANTHROPIC_API_KEY is set (best
 *  quality, keeps tone), otherwise with the keyless fallback. Returns null when the call fails: the page then falls back to
 *  the original text, so nothing disappears. */
export async function translatePair(src: { quote: string; role?: string | null }, fetchImpl: typeof fetch = fetch): Promise<Translation | null> {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return translateKeyless(src, fetchImpl)
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

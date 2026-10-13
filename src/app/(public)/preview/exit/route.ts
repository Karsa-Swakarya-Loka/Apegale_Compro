// POST /preview/exit — the preview bar's button. Turns draft mode off and returns to the same page.
import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'
import { safePath } from '@/lib/preview'

export async function POST(request: Request) {
  ;(await draftMode()).disable()
  const referer = request.headers.get('referer')
  const from = referer && new URL(referer).origin === new URL(request.url).origin ? new URL(referer) : null
  const path = safePath(from ? `${from.pathname}${from.search}` : null) ?? '/'
  return NextResponse.redirect(new URL(path, request.url), 303)
}

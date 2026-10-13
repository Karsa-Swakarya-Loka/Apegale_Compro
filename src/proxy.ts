// Tells the public root layout which language the first HTML response is in.
// Client navigation keeps <html lang> in sync through LanguageSync.
// Also strips trailing slashes with a 301 (next.config turns Next's own 308 off; legacy URLs run first).
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { localeFromPath } from './i18n/routes'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.length > 1 && pathname.endsWith('/')) {
    // A plain URL: NextURL keeps the trailing slash when formatting.
    const url = new URL(request.url)
    url.pathname = pathname.replace(/\/+$/, '') || '/'
    return NextResponse.redirect(url, 301)
  }
  const headers = new Headers(request.headers)
  headers.set('x-locale', localeFromPath(pathname))
  return NextResponse.next({ request: { headers } })
}

export const config = {
  // Public pages only: Payload admin/API, Next internals and static files are untouched.
  matcher: ['/((?!admin|api|_next|brand|media|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.[a-z0-9]+$).*)'],
}

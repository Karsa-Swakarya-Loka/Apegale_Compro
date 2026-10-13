/** Exact pages and ancestor sections have different accessible current states. */
export function navCurrent(pathname: string, href: string, homeHref: string): 'page' | 'location' | undefined {
  if (href.includes('#')) return undefined
  const path = href.split('?')[0].replace(/\/$/, '') || '/'
  const current = pathname.replace(/\/$/, '') || '/'
  if (current === path) return 'page'
  if (path !== homeHref && current.startsWith(path + '/')) return 'location'
  return undefined
}

/** A selected page starts at the top; an anchor link keeps its explicit destination. */
export function navDestination(href: string) {
  const [path, hash = ''] = href.split('#')
  return { pathname: path.split('?')[0] || '/', hash }
}

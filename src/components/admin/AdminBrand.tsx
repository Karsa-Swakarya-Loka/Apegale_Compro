// CMS (Payload admin) graphics from the public site's brand files: the wordmark on the login screen, the mark in the
// navigation and breadcrumbs. Registered in payload.config.ts → admin.components.graphics.
import Image from 'next/image'

export function AdminLogo() {
  return <Image src="/brand/apegale-logo.png" alt="Ape Gale Indonesia" width={1200} height={409} priority style={{ width: 240, maxWidth: '100%', height: 'auto' }} />
}

export function AdminIcon() {
  return <Image src="/brand/apegale-mark.png" alt="Ape Gale Indonesia" width={600} height={575} style={{ width: 30, height: 'auto' }} />
}

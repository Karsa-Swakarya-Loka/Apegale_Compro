// GET /preview?path=/layanan/vitas — opened by the "Preview" button in /admin. Only a signed-in CMS user
// may turn on draft mode; it then applies to that browser until "Keluar pratinjau" (POST /preview/exit).
import { draftMode, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { payloadClient } from '@/lib/cms'
import { safePath } from '@/lib/preview'

export async function GET(request: Request) {
  const path = safePath(new URL(request.url).searchParams.get('path'))
  if (!path) return new Response('Invalid path', { status: 400 })
  const payload = await payloadClient()
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return new Response('Masuk ke /admin terlebih dahulu untuk melihat pratinjau.', { status: 401 })
  ;(await draftMode()).enable()
  redirect(path)
}

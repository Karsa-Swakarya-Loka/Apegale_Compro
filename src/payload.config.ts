import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { id } from '@payloadcms/translations/languages/id'
import sharp from 'sharp'
import { Services } from './collections/Services.ts'
import { Testimonials } from './collections/Testimonials.ts'
import { Clients } from './collections/Clients.ts'
import { Faqs } from './collections/Faqs.ts'
import { Posts } from './collections/Posts.ts'
import { Regulations } from './collections/Regulations.ts'
import { Media } from './collections/Media.ts'
import { Inquiries } from './collections/Inquiries.ts'
import { Users } from './collections/Users.ts'
import { Site } from './globals/Site.ts'
import { Home } from './globals/Home.ts'
import { About } from './globals/About.ts'
import { Garis } from './globals/Garis.ts'
import { Ui } from './globals/Ui.ts'
import { database } from './lib/database.ts'
import { localization } from './i18n/config.ts'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const secret = process.env.PAYLOAD_SECRET
if (!secret || secret.length < 32) throw new Error('PAYLOAD_SECRET must contain at least 32 random characters')
const serverURL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
// Serverless hosts (Vercel) have no persistent disk: with a Blob token, Media files go to Vercel Blob.
// Without it (local dev, VPS) they stay in MEDIA_DIR. Client uploads skip the 4.5 MB function body limit.
const blobToken = process.env.BLOB_READ_WRITE_TOKEN
const storage = blobToken ? [vercelBlobStorage({ collections: { media: true }, token: blobToken, clientUploads: true })] : []
export default buildConfig({
 serverURL, secret,
 admin: {
  user: Users.slug, importMap: { baseDir: dirname },
  // The CMS follows the public site's design: light theme, brand logo/mark, favicon (see app/(payload)/admin-theme.css).
  theme: 'light',
  components: {
   graphics: { Logo: '/components/admin/AdminBrand#AdminLogo', Icon: '/components/admin/AdminBrand#AdminIcon' },
   // Dashboard starting point: the main task first, then frequent ones and the count of new messages.
   beforeDashboard: ['/components/admin/StartHere#StartHere'],
  },
  meta: {
   titleSuffix: ' | CMS Ape Gale Indonesia',
   icons: [{ rel: 'icon', type: 'image/png', url: '/brand/icon-32.png' }, { rel: 'apple-touch-icon', url: '/brand/apple-touch-icon.png' }],
  },
 },
 // CMS interface in Indonesian only, for the client's team (content itself stays bilingual via localization).
 i18n: { supportedLanguages: { id }, fallbackLanguage: 'id' },
 localization,
 collections: [Services, Testimonials, Clients, Faqs, Posts, Regulations, Media, Inquiries, Users],
 globals: [Site, Home, About, Garis, Ui],
 editor: lexicalEditor(),
 db: database(), sharp,
 plugins: storage,
 typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
 csrf: [serverURL],
 email: process.env.SMTP_HOST ? nodemailerAdapter({
  defaultFromAddress: process.env.SMTP_FROM_ADDRESS || '',
  defaultFromName: process.env.SMTP_FROM_NAME || 'Ape Gale Indonesia',
  transportOptions: { host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587),
   secure: process.env.SMTP_SECURE === 'true',
   ...(process.env.SMTP_USER ? { auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } } : {}),
  },
 }) : undefined,
})

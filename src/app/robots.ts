// /robots.txt — public pages and uploaded files (regulation PDFs) are crawlable; the CMS admin and API are not.
import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: ['/', '/api/media/file/'], disallow: ['/admin', '/api/'] },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}

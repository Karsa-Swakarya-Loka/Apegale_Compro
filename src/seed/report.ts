import type { Payload } from 'payload'
export async function reportCounts(payload: Payload) {
 const counts = []
 for (const collection of ['services','testimonials','clients','faqs','posts','regulations','media','inquiries','users'] as const) {
  for (const locale of ['id','en'] as const) {
   const result = await payload.find({ collection, locale, fallbackLocale: false, limit: 1, depth: 0, overrideAccess: true, ...(collection === 'users' || collection === 'inquiries' ? {} : { draft: true }) })
   counts.push({ collection, locale, documents: result.totalDocs })
  }
 }
 return counts
}

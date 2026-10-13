import { ArticleDetailPage, articleMetadata } from '@/components/templates/ArticleDetailPage'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  return articleMetadata('regulations', 'en', (await params).slug)
}
export default async function Page({ params }: Props) {
  return <ArticleDetailPage kind="regulations" locale="en" slug={(await params).slug} />
}

import { ArticleDetailPage, articleMetadata } from '@/components/templates/ArticleDetailPage'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  return articleMetadata('news', 'en', (await params).slug)
}
export default async function Page({ params }: Props) {
  return <ArticleDetailPage kind="news" locale="en" slug={(await params).slug} />
}

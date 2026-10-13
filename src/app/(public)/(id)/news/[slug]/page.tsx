import { ArticleDetailPage, articleMetadata } from '@/components/templates/ArticleDetailPage'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  return articleMetadata('news', 'id', (await params).slug)
}
export default async function Page({ params }: Props) {
  return <ArticleDetailPage kind="news" locale="id" slug={(await params).slug} />
}

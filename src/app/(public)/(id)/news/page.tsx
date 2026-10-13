import { ArticlesPage, articlesMetadata, type ListQuery } from '@/components/templates/ArticlesPage'

type Props = { searchParams: Promise<ListQuery> }

export const generateMetadata = () => articlesMetadata('news', 'id')
export default async function Page({ searchParams }: Props) {
  return <ArticlesPage kind="news" locale="id" query={await searchParams} />
}

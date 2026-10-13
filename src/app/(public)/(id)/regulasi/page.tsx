import { ArticlesPage, articlesMetadata, type ListQuery } from '@/components/templates/ArticlesPage'

type Props = { searchParams: Promise<ListQuery> }

export const generateMetadata = () => articlesMetadata('regulations', 'id')
export default async function Page({ searchParams }: Props) {
  return <ArticlesPage kind="regulations" locale="id" query={await searchParams} />
}

import { ArticlesPage, articlesMetadata, type ListQuery } from '@/components/templates/ArticlesPage'

type Props = { searchParams: Promise<ListQuery> }

export const generateMetadata = () => articlesMetadata('regulations', 'en')
export default async function Page({ searchParams }: Props) {
  return <ArticlesPage kind="regulations" locale="en" query={await searchParams} />
}

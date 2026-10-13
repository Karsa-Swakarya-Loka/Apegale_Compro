import { ServiceDetailPage, serviceMetadata } from '@/components/templates/ServiceDetailPage'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  return serviceMetadata('en', (await params).slug)
}
export default async function Page({ params }: Props) {
  return <ServiceDetailPage locale="en" slug={(await params).slug} />
}

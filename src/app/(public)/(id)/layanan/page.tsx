import { ServicesPage, servicesMetadata } from '@/components/templates/ServicesPage'

export const generateMetadata = () => servicesMetadata('id')
export default function Page() {
  return <ServicesPage locale="id" />
}

import { ServicesPage, servicesMetadata } from '@/components/templates/ServicesPage'

export const generateMetadata = () => servicesMetadata('en')
export default function Page() {
  return <ServicesPage locale="en" />
}

import { ContactPage, contactMetadata } from '@/components/templates/ContactPage'

export const generateMetadata = () => contactMetadata('id')
export default function Page() {
  return <ContactPage locale="id" />
}

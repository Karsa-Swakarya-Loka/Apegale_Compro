import { ContactPage, contactMetadata } from '@/components/templates/ContactPage'

export const generateMetadata = () => contactMetadata('en')
export default function Page() {
  return <ContactPage locale="en" />
}

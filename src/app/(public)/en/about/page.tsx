import { AboutPage, aboutMetadata } from '@/components/templates/AboutPage'

export const generateMetadata = () => aboutMetadata('en')
export default function Page() {
  return <AboutPage locale="en" />
}

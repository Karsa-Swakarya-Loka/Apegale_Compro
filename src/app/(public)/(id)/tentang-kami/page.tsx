import { AboutPage, aboutMetadata } from '@/components/templates/AboutPage'

export const generateMetadata = () => aboutMetadata('id')
export default function Page() {
  return <AboutPage locale="id" />
}

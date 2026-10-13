import { HomePage, homeMetadata } from '@/components/templates/HomePage'

export const generateMetadata = () => homeMetadata('id')
export default function Page() {
  return <HomePage locale="id" />
}

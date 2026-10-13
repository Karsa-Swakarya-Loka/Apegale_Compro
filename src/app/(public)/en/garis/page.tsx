import { GarisPage, garisMetadata } from '@/components/templates/GarisPage'

export const generateMetadata = () => garisMetadata('en')
export default function Page() {
  return <GarisPage locale="en" />
}

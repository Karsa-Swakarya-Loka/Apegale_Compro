import { GarisPage, garisMetadata } from '@/components/templates/GarisPage'

export const generateMetadata = () => garisMetadata('id')
export default function Page() {
  return <GarisPage locale="id" />
}

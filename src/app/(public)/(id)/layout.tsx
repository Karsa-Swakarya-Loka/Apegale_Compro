import type { ReactNode } from 'react'
import { LocaleLayout, localeMetadata } from '@/components/templates/localeLayout'

export const generateMetadata = () => localeMetadata('id')
export default function Layout({ children }: { children: ReactNode }) {
  return <LocaleLayout locale="id">{children}</LocaleLayout>
}

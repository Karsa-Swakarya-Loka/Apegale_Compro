// Single public root layout for both languages so switching locale never crosses root layouts.
// The first response's <html lang> comes from proxy.ts; LanguageSync keeps it right afterwards.
import type { ReactNode } from 'react'
import { headers } from 'next/headers'
import { Montserrat, Roboto } from 'next/font/google'
import { LanguageSync } from '@/i18n/LanguageSync'
import '@/styles/tokens.css'
import '@/styles/components.css'
import '@/styles/shell.css'
import '@/styles/home.css'
import '@/styles/pages.css'
import '@/styles/brand.css'
import '@/styles/motion.css'
import '@/styles/pivot.css'
import '@/styles/template.css'
import '@/styles/hierarchy.css'
import '@/styles/compro.css'
import '@/styles/system.css'

// Type from the 2026 Company Profile PDF: Roboto for titles and text (Bold/Black titles), Montserrat ExtraBold for small labels.
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700', '900'], style: ['normal', 'italic'], variable: '--font-roboto', display: 'swap' })
const label = Montserrat({ subsets: ['latin'], weight: ['800'], variable: '--font-montserrat', display: 'swap', preload: false })

export default async function PublicRootLayout({ children }: { children: ReactNode }) {
  const locale = (await headers()).get('x-locale') === 'en' ? 'en' : 'id'
  return (
    <html lang={locale} data-theme="light" className={`${roboto.variable} ${label.variable} ag-fonts`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available so reveal animations may hide content until it scrolls in. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="ag">
        <LanguageSync />
        {children}
      </body>
    </html>
  )
}

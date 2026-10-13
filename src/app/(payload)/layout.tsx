import config from '@payload-config'
import '@payloadcms/next/css'
import './admin-theme.css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'
import type { ReactNode } from 'react'
import { Montserrat, Roboto } from 'next/font/google'
import { importMap } from './admin/importMap.js'

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'
  return handleServerFunctions({ ...args, config, importMap })
}
// The site's fonts in the CMS: Roboto for text and headings, Montserrat ExtraBold for small labels.
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700', '800', '900'], display: 'swap' })
const label = Montserrat({ subsets: ['latin'], weight: ['800'], display: 'swap', preload: false })

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      <style>{`:root { --font-body: ${roboto.style.fontFamily}, system-ui, sans-serif; --font-label: ${label.style.fontFamily}, system-ui, sans-serif; }`}</style>
      {children}
    </RootLayout>
  )
}

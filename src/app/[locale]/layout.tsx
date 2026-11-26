import type { Metadata, Viewport } from "next"
import { getMessages } from "next-intl/server"

import { siteName, siteUrl } from "@/constants/site"
import { routing } from "@/i18n/routing"

import "../globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
}

export const viewport: Viewport = {
  themeColor: "#9C4684",
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const { meta } = await getMessages()

  return (
    <html
      lang={meta.lang}
      className="h-full antialiased motion-safe:scroll-smooth"
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}

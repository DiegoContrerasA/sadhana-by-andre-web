import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google"

import { cn } from "@/lib/utils"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Sadhana by Andre",
  description: "Aprende yoga postura por postura.",
  openGraph: {
    siteName: "Sadhana by Andre",
    locale: "es_CO",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
}

export const viewport: Viewport = {
  themeColor: "#9C4684",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={cn(
        geistSans.variable,
        cormorantGaramond.variable,
        geistMono.variable,
        "h-full antialiased",
      )}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}

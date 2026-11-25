import type { Metadata, Viewport } from "next"

import "./globals.css"

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
    <html lang="es" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}

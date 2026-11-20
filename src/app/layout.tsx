import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { cn } from "@/lib/utils"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Sadhana by Andre",
  description: "Aprende yoga postura por postura.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={cn(
        geistSans.variable,
        geistMono.variable,
        "h-full antialiased",
      )}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}

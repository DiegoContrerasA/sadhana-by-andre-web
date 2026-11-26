import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import type { ReactNode } from "react"

import { AuthCover } from "../components/auth-cover"

type AuthLayoutProps = {
  children: ReactNode
}

export async function AuthLayout({ children }: AuthLayoutProps) {
  const { auth } = await getMessages()

  return (
    <div className="grid flex-1 lg:grid-cols-[minmax(28rem,2fr)_3fr]">
      <main className="flex flex-col bg-secondary **:data-[slot=field-separator-content]:bg-secondary gap-10 px-6 py-8 sm:px-12 lg:py-12">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-4">
          <NextIntlClientProvider messages={{ auth }}>
            {children}
          </NextIntlClientProvider>
        </div>
      </main>
      <AuthCover />
    </div>
  )
}

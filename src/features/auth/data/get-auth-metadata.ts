import "server-only"

import type { Metadata } from "next"
import { getMessages } from "next-intl/server"

type AuthPage = "signIn" | "signUp" | "forgotPassword" | "resetPassword"

export async function getAuthMetadata(page: AuthPage): Promise<Metadata> {
  const { auth } = await getMessages()

  return {
    title: auth[page].metaTitle,
    robots: { index: false, follow: false },
  }
}

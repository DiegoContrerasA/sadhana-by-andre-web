import { getLocale } from "next-intl/server"

import { ComingSoonScreen, getAuthMetadata } from "@/features/auth/server"
import { getPathname } from "@/i18n/navigation"

export function generateMetadata() {
  return getAuthMetadata("forgotPassword")
}

export default async function ForgotPasswordPage() {
  const locale = await getLocale()

  return (
    <ComingSoonScreen
      page="forgotPassword"
      signInHref={getPathname({ href: "/sign-in", locale })}
    />
  )
}

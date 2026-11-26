import { getLocale } from "next-intl/server"

import {
  ForgotPasswordScreen,
  getAuthMetadata,
  getMockResetHref,
} from "@/features/auth/server"
import { getPathname } from "@/i18n/navigation"

export function generateMetadata() {
  return getAuthMetadata("forgotPassword")
}

export default async function ForgotPasswordPage() {
  const locale = await getLocale()
  const resetHref = getPathname({ href: "/reset-password", locale })

  return (
    <ForgotPasswordScreen
      signInHref={getPathname({ href: "/sign-in", locale })}
      mockResetHref={getMockResetHref(resetHref)}
    />
  )
}

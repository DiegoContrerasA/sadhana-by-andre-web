import { getLocale } from "next-intl/server"

import { getAuthMetadata, ResetPasswordScreen } from "@/features/auth/server"
import { getPathname } from "@/i18n/navigation"

export function generateMetadata() {
  return getAuthMetadata("resetPassword")
}

export default async function ResetPasswordPage({
  searchParams,
}: PageProps<"/[locale]/reset-password">) {
  const [locale, { token }] = await Promise.all([getLocale(), searchParams])

  return (
    <ResetPasswordScreen
      token={token}
      signInHref={getPathname({ href: "/sign-in", locale })}
      forgotPasswordHref={getPathname({ href: "/forgot-password", locale })}
    />
  )
}

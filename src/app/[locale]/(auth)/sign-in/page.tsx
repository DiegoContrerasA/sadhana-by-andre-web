import { getLocale } from "next-intl/server"

import { getAuthMetadata, SignInScreen } from "@/features/auth/server"
import { getPathname } from "@/i18n/navigation"

export function generateMetadata() {
  return getAuthMetadata("signIn")
}

export default async function SignInPage() {
  const locale = await getLocale()

  return (
    <SignInScreen
      signUpHref={getPathname({ href: "/sign-up", locale })}
      forgotPasswordHref={getPathname({ href: "/forgot-password", locale })}
    />
  )
}

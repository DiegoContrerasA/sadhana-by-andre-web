import { getLocale } from "next-intl/server"

import { ComingSoonScreen, getAuthMetadata } from "@/features/auth/server"
import { getPathname } from "@/i18n/navigation"

export function generateMetadata() {
  return getAuthMetadata("signUp")
}

export default async function SignUpPage() {
  const locale = await getLocale()

  return (
    <ComingSoonScreen
      page="signUp"
      signInHref={getPathname({ href: "/sign-in", locale })}
    />
  )
}

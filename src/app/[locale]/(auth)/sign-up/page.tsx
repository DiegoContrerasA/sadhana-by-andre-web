import { getLocale } from "next-intl/server"

import { getAuthMetadata, SignUpScreen } from "@/features/auth/server"
import { getPathname } from "@/i18n/navigation"

export function generateMetadata() {
  return getAuthMetadata("signUp")
}

export default async function SignUpPage() {
  const locale = await getLocale()

  return <SignUpScreen signInHref={getPathname({ href: "/sign-in", locale })} />
}

import { getLocale } from "next-intl/server"

import { AuthLayout } from "@/features/auth/server"
import { getPathname } from "@/i18n/navigation"

export default async function AuthGroupLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale()
  const homeHref = getPathname({ href: "/", locale })

  return <AuthLayout homeHref={homeHref}>{children}</AuthLayout>
}

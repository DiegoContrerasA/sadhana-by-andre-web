import { getLocale } from "next-intl/server"

import { ProfileScreen } from "@/features/account/server"
import { getSectionMetadata } from "@/features/app-shell/server"
import { getPathname } from "@/i18n/navigation"

export function generateMetadata() {
  return getSectionMetadata("profile")
}

export default async function ProfilePage() {
  const locale = await getLocale()

  return (
    <ProfileScreen
      locale={locale}
      myCoursesHref={getPathname({ href: "/my-courses", locale })}
      favoritesHref={getPathname({ href: "/favorites", locale })}
      changePasswordHref={getPathname({ href: "/forgot-password", locale })}
      languageHrefs={{
        es: getPathname({ href: "/profile", locale: "es" }),
        en: getPathname({ href: "/profile", locale: "en" }),
      }}
    />
  )
}

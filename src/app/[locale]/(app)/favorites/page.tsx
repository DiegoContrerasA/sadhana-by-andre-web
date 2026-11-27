import { getLocale } from "next-intl/server"

import { getSectionMetadata } from "@/features/app-shell/server"
import { FavoritesScreen } from "@/features/progress/server"
import { getPathname } from "@/i18n/navigation"

export function generateMetadata() {
  return getSectionMetadata("favorites")
}

export default async function FavoritesPage() {
  const locale = await getLocale()

  return (
    <FavoritesScreen
      locale={locale}
      coursesHref={getPathname({ href: "/courses", locale })}
    />
  )
}

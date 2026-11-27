import { getLocale } from "next-intl/server"

import { getSectionMetadata } from "@/features/app-shell/server"
import { CoursesScreen } from "@/features/catalog/server"
import { getPathname } from "@/i18n/navigation"

export function generateMetadata() {
  return getSectionMetadata("courses")
}

export default async function CoursesPage({
  searchParams,
}: PageProps<"/[locale]/courses">) {
  const locale = await getLocale()

  return (
    <CoursesScreen
      locale={locale}
      basePath={getPathname({ href: "/courses", locale })}
      searchParams={searchParams}
    />
  )
}

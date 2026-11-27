import { getLocale } from "next-intl/server"

import { getSectionMetadata } from "@/features/app-shell/server"
import { MyCoursesScreen } from "@/features/progress/server"
import { getPathname } from "@/i18n/navigation"

export function generateMetadata() {
  return getSectionMetadata("myCourses")
}

export default async function MyCoursesPage() {
  const locale = await getLocale()

  return (
    <MyCoursesScreen
      locale={locale}
      coursesHref={getPathname({ href: "/courses", locale })}
    />
  )
}

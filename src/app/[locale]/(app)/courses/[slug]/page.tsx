import { getLocale } from "next-intl/server"

import {
  CourseLessonScreen,
  getCourseMetadata,
  getCourses,
} from "@/features/catalog/server"
import { createCourseAccess } from "@/features/progress/server"
import { getPathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

export async function generateStaticParams() {
  const courses = await getCourses(routing.defaultLocale)

  return courses.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/courses/[slug]">) {
  const [locale, { slug }] = await Promise.all([getLocale(), params])

  return getCourseMetadata(locale, slug)
}

export default async function CoursePage({
  params,
}: PageProps<"/[locale]/courses/[slug]">) {
  const locale = await getLocale()
  const myCoursesHref = getPathname({ href: "/my-courses", locale })

  return (
    <CourseLessonScreen
      locale={locale}
      exploreHref={getPathname({ href: "/courses", locale })}
      params={params}
      access={createCourseAccess(myCoursesHref)}
    />
  )
}

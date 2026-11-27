import { getLocale } from "next-intl/server"

import {
  CourseDetailScreen,
  getCourseMetadata,
  getCourses,
} from "@/features/catalog/server"
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

export default async function CourseDetailPage({
  params,
}: PageProps<"/[locale]/courses/[slug]">) {
  const [locale, { slug }] = await Promise.all([getLocale(), params])

  return (
    <CourseDetailScreen
      locale={locale}
      slug={slug}
      backHref={getPathname({ href: "/courses", locale })}
    />
  )
}

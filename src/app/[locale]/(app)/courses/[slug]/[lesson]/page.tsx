import { getLocale } from "next-intl/server"

import {
  CourseLessonScreen,
  getCourseMetadata,
  getLessonParams,
} from "@/features/catalog/server"
import { getPathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"

export function generateStaticParams() {
  return getLessonParams(routing.defaultLocale)
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/courses/[slug]/[lesson]">) {
  const [locale, { slug, lesson }] = await Promise.all([getLocale(), params])

  return getCourseMetadata(locale, slug, lesson)
}

export default async function LessonPage({
  params,
}: PageProps<"/[locale]/courses/[slug]/[lesson]">) {
  const locale = await getLocale()

  return (
    <CourseLessonScreen
      locale={locale}
      exploreHref={getPathname({ href: "/courses", locale })}
      params={params}
    />
  )
}

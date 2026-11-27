import "server-only"

import type { Locale } from "next-intl"

import { getCourse } from "./get-course"
import { getCourses } from "./get-courses"

export async function getLessonParams(locale: Locale) {
  const courses = await getCourses(locale)
  const details = await Promise.all(
    courses.map(({ slug }) => getCourse(locale, slug)),
  )

  return details.flatMap(({ slug, lessons }) =>
    lessons.slice(1).map((lesson) => ({ slug, lesson: lesson.slug })),
  )
}

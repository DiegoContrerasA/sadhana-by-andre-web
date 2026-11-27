import "server-only"

import { notFound } from "next/navigation"
import type { Locale } from "next-intl"

import { getLessonPosition } from "../utils/get-lesson-position"
import { getCourse } from "./get-course"

export async function getLesson(
  locale: Locale,
  courseSlug: string,
  lessonSlug?: string,
) {
  const course = await getCourse(locale, courseSlug)
  const position = getLessonPosition(course.lessons, lessonSlug)
  const isFirstLessonAlias = lessonSlug !== undefined && position?.index === 0
  if (!position || isFirstLessonAlias) notFound()

  return { course, ...position }
}

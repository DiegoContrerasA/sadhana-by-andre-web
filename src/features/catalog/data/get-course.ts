import "server-only"

import { notFound } from "next/navigation"
import type { Locale } from "next-intl"

import { getCourses } from "./get-courses"

export async function getCourse(locale: Locale, slug: string) {
  const courses = await getCourses(locale)
  const course = courses.find((candidate) => candidate.slug === slug)
  if (!course) notFound()

  return course
}

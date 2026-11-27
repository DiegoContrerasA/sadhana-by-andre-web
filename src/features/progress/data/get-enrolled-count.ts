import "server-only"

import { routing } from "@/i18n/routing"

import { getEnrolledCourses } from "./get-enrolled-courses"

export async function getEnrolledCount() {
  const courses = await getEnrolledCourses(routing.defaultLocale)

  return courses.length
}

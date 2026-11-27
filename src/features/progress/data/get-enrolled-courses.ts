import "server-only"

import type { Locale } from "next-intl"

import { getCourses } from "@/features/catalog/server"

import { selectCourses } from "../utils/select-courses"
import { getEnrolledSlugs } from "./get-enrolled-slugs"

export async function getEnrolledCourses(locale: Locale) {
  const [slugs, courses] = await Promise.all([
    getEnrolledSlugs(),
    getCourses(locale),
  ])

  return selectCourses(courses, slugs)
}

import "server-only"

import type { Locale } from "next-intl"

import { getCourses } from "@/features/catalog/server"
import { getFavoriteSlugs } from "@/features/favorites/server"

import { selectCourses } from "../utils/select-courses"

export async function getFavoriteCourses(locale: Locale) {
  const [slugs, courses] = await Promise.all([
    getFavoriteSlugs(),
    getCourses(locale),
  ])

  return selectCourses(courses, slugs)
}

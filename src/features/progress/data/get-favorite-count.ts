import "server-only"

import { routing } from "@/i18n/routing"

import { getFavoriteCourses } from "./get-favorite-courses"

export async function getFavoriteCount() {
  const courses = await getFavoriteCourses(routing.defaultLocale)

  return courses.length
}

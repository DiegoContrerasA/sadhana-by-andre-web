import type { Locale } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"

import { getFavoriteCourses } from "../data/get-favorite-courses"
import { CourseCollection } from "./course-collection"
import { EmptyCollection } from "./empty-collection"

type FavoriteCoursesProps = {
  locale: Locale
  coursesHref: string
}

export async function FavoriteCourses({
  locale,
  coursesHref,
}: FavoriteCoursesProps) {
  const [{ favorites }, t, courses] = await Promise.all([
    getMessages(),
    getTranslations("favorites"),
    getFavoriteCourses(locale),
  ])
  if (courses.length === 0) {
    return <EmptyCollection copy={favorites.empty} exploreHref={coursesHref} />
  }

  return (
    <CourseCollection
      courses={courses}
      coursesHref={coursesHref}
      countLabel={t("count", { count: courses.length })}
    />
  )
}

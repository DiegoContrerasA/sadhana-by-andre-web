import type { Locale } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"

import { getEnrolledCourses } from "../data/get-enrolled-courses"
import { CourseCollection } from "./course-collection"
import { EmptyCollection } from "./empty-collection"

type SavedCoursesProps = {
  locale: Locale
  coursesHref: string
}

export async function SavedCourses({ locale, coursesHref }: SavedCoursesProps) {
  const [{ myCourses }, t, courses] = await Promise.all([
    getMessages(),
    getTranslations("myCourses"),
    getEnrolledCourses(locale),
  ])
  if (courses.length === 0) {
    return <EmptyCollection copy={myCourses.empty} exploreHref={coursesHref} />
  }

  return (
    <CourseCollection
      courses={courses}
      coursesHref={coursesHref}
      countLabel={t("count", { count: courses.length })}
    />
  )
}

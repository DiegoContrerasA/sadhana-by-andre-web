import type { Locale } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"

import { CourseCard } from "@/features/catalog"

import { getEnrolledCourses } from "../data/get-enrolled-courses"
import { EmptyMyCourses } from "./empty-my-courses"

const eagerCardCount = 3

type SavedCoursesProps = {
  locale: Locale
  coursesHref: string
}

export async function SavedCourses({ locale, coursesHref }: SavedCoursesProps) {
  const [{ catalog, myCourses }, t, courses] = await Promise.all([
    getMessages(),
    getTranslations("myCourses"),
    getEnrolledCourses(locale),
  ])
  if (courses.length === 0) {
    return <EmptyMyCourses copy={myCourses.empty} exploreHref={coursesHref} />
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        {t("count", { count: courses.length })}
      </p>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
        {courses.map((course, index) => (
          <li key={course.slug}>
            <CourseCard
              copy={catalog.card}
              course={course}
              href={`${coursesHref}/${course.slug}`}
              levelLabel={
                course.level ? catalog.levels[course.level] : undefined
              }
              isEager={index < eagerCardCount}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

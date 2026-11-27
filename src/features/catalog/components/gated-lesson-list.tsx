import { getMessages, getTranslations } from "next-intl/server"

import type { CourseDetail } from "../schema/course.schema"
import type { CourseAccess } from "../schema/course-access.schema"
import { formatDuration } from "../utils/format-duration"
import { LessonList } from "./lesson-list"

type GatedLessonListProps = {
  courseHref: string
  course: CourseDetail
  currentSlug: string
  access: CourseAccess
}

export async function GatedLessonList({
  courseHref,
  course,
  currentSlug,
  access,
}: GatedLessonListProps) {
  const [{ catalog }, t, hasAccess] = await Promise.all([
    getMessages(),
    getTranslations("catalog.lesson"),
    access.hasAccess(course.slug),
  ])
  const countLabel = t("count", { count: course.lessons.length })

  return (
    <LessonList
      copy={catalog.lesson}
      summaryLabel={`${countLabel} · ${formatDuration(course.durationMinutes)}`}
      courseHref={courseHref}
      lessons={course.lessons}
      currentSlug={currentSlug}
      hasAccess={hasAccess}
    />
  )
}

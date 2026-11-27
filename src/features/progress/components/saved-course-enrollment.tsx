import { getMessages, getTranslations } from "next-intl/server"

import { isCourseEnrolled } from "../data/is-course-enrolled"
import { EnrollmentPanel } from "./enrollment-panel"

type SavedCourseEnrollmentProps = {
  slug: string
  lessonCount: number
  myCoursesHref: string
}

export async function SavedCourseEnrollment({
  slug,
  lessonCount,
  myCoursesHref,
}: SavedCourseEnrollmentProps) {
  const [{ myCourses }, t, isEnrolled] = await Promise.all([
    getMessages(),
    getTranslations("myCourses"),
    isCourseEnrolled(slug),
  ])

  return (
    <EnrollmentPanel
      key={slug}
      copy={myCourses.enrollment}
      slug={slug}
      hint={t("hint", { count: lessonCount })}
      isEnrolled={isEnrolled}
      myCoursesHref={myCoursesHref}
    />
  )
}

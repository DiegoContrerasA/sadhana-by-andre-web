import type { CourseAccess } from "@/features/catalog"

import { isCourseEnrolled } from "../data/is-course-enrolled"
import { CourseEnrollment } from "./course-enrollment"
import { UnlockCourseButton } from "./unlock-course-button"

export function createCourseAccess(myCoursesHref: string): CourseAccess {
  return {
    hasAccess: isCourseEnrolled,
    renderPanel: (slug, lessonCount) => (
      <CourseEnrollment
        slug={slug}
        lessonCount={lessonCount}
        myCoursesHref={myCoursesHref}
      />
    ),
    renderUnlockAction: (slug) => <UnlockCourseButton slug={slug} />,
  }
}

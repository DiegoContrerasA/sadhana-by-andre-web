import { type ComponentProps, Suspense } from "react"

import { CourseLessonSkeleton } from "../components/course-lesson-skeleton"
import { UrlCourseLesson } from "../components/url-course-lesson"

export function CourseLessonScreen(
  props: ComponentProps<typeof UrlCourseLesson>,
) {
  return (
    <Suspense fallback={<CourseLessonSkeleton />}>
      <UrlCourseLesson {...props} />
    </Suspense>
  )
}

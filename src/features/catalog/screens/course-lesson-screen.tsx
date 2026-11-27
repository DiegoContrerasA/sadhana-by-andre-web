import type { Locale } from "next-intl"
import { Suspense } from "react"

import { CourseLessonSkeleton } from "../components/course-lesson-skeleton"
import { UrlCourseLesson } from "../components/url-course-lesson"

type CourseLessonScreenProps = {
  locale: Locale
  exploreHref: string
  params: Promise<{ slug: string; lesson?: string }>
}

export function CourseLessonScreen(props: CourseLessonScreenProps) {
  return (
    <Suspense fallback={<CourseLessonSkeleton />}>
      <UrlCourseLesson {...props} />
    </Suspense>
  )
}

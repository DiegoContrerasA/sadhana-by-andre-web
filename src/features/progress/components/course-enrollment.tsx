import { type ComponentProps, Suspense } from "react"

import { SavedCourseEnrollment } from "./saved-course-enrollment"

export function CourseEnrollment(
  props: ComponentProps<typeof SavedCourseEnrollment>,
) {
  return (
    <Suspense
      fallback={
        <div
          aria-hidden="true"
          className="h-28 animate-pulse rounded-xl bg-primary/10 motion-reduce:animate-none"
        />
      }
    >
      <SavedCourseEnrollment {...props} />
    </Suspense>
  )
}

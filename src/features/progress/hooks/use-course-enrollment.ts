import { useState, useTransition } from "react"

import { enrollCourse } from "../actions/enroll-course"
import { unenrollCourse } from "../actions/unenroll-course"

export function useCourseEnrollment(slug: string) {
  const [isPending, startTransition] = useTransition()
  const [hasFailed, setHasFailed] = useState(false)

  function run(request: typeof enrollCourse) {
    setHasFailed(false)
    startTransition(async () => {
      try {
        const result = await request(slug)
        setHasFailed(!result.ok)
      } catch {
        setHasFailed(true)
      }
    })
  }

  return {
    isPending,
    hasFailed,
    enroll: () => run(enrollCourse),
    unenroll: () => run(unenrollCourse),
  }
}

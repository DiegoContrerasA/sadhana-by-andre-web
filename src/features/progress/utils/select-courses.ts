import type { Course } from "@/features/catalog"

export function selectCourses(courses: Course[], slugs: string[]) {
  return slugs.flatMap((slug) =>
    courses.filter((course) => course.slug === slug),
  )
}

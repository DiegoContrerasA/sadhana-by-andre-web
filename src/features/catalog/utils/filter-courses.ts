import type { Course } from "../schema/course.schema"
import type { CourseFilters } from "../schema/course-filters.schema"

function toSearchText(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
}

export function filterCourses(courses: Course[], filters: CourseFilters) {
  const { q, level } = filters
  const query = toSearchText(q ?? "")

  return courses.filter((course) => {
    if (level && course.level !== level) return false

    return [course.name, course.sanskritName].some((name) =>
      toSearchText(name).includes(query),
    )
  })
}

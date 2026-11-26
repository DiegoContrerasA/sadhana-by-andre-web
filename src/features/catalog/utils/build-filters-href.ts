import type { CourseFilters } from "../schema/course-filters.schema"

export function buildFiltersHref(basePath: string, filters: CourseFilters) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value)
  }
  const query = params.toString()

  return query ? `${basePath}?${query}` : basePath
}

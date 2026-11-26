import { getMessages } from "next-intl/server"

import { courseFiltersSchema } from "../schema/course-filters.schema"
import { CourseFilters } from "./course-filters"

type UrlCourseFiltersProps = {
  basePath: string
  searchParams: Promise<unknown>
}

export async function UrlCourseFilters({
  basePath,
  searchParams,
}: UrlCourseFiltersProps) {
  const [{ catalog }, params] = await Promise.all([getMessages(), searchParams])
  const filters = courseFiltersSchema.parse(params)

  return <CourseFilters copy={catalog} basePath={basePath} filters={filters} />
}

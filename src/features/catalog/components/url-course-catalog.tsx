import type { Locale } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"

import { getCourses } from "../data/get-courses"
import { courseFiltersSchema } from "../schema/course-filters.schema"
import { buildFiltersHref } from "../utils/build-filters-href"
import { filterCourses } from "../utils/filter-courses"
import { CourseFilters } from "./course-filters"
import { CourseResults } from "./course-results"

type UrlCourseCatalogProps = {
  locale: Locale
  basePath: string
  searchParams: Promise<unknown>
}

export async function UrlCourseCatalog({
  locale,
  basePath,
  searchParams,
}: UrlCourseCatalogProps) {
  const [{ catalog }, t, courses, params] = await Promise.all([
    getMessages(),
    getTranslations("catalog"),
    getCourses(locale),
    searchParams,
  ])
  const filters = courseFiltersSchema.parse(params)
  const results = filterCourses(courses, filters)

  return (
    <>
      <CourseFilters copy={catalog} basePath={basePath} filters={filters} />
      <CourseResults
        key={buildFiltersHref(basePath, filters)}
        copy={catalog}
        basePath={basePath}
        courses={results}
        countLabel={t("resultCount", { count: results.length })}
      />
    </>
  )
}

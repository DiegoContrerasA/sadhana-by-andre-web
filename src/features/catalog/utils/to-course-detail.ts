import type { Locale } from "next-intl"

import type { CourseDetail, CourseRecord } from "../schema/course.schema"
import type { CourseOverviewRecord } from "../schema/course-overview.schema"
import { toCourse } from "./to-course"
import { toCourseOverview } from "./to-course-overview"

export function toCourseDetail(
  record: CourseRecord,
  overview: CourseOverviewRecord,
  locale: Locale,
): CourseDetail {
  return {
    ...toCourse(record, locale),
    overview: toCourseOverview(overview, locale),
    lessons: record.lessons.map(({ title, description, ...lesson }) => ({
      ...lesson,
      title: title[locale],
      description: description[locale],
    })),
  }
}

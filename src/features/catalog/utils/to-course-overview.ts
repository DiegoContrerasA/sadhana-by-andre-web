import type { Locale } from "next-intl"

import type {
  CourseOverview,
  CourseOverviewRecord,
} from "../schema/course-overview.schema"

export function toCourseOverview(
  record: CourseOverviewRecord,
  locale: Locale,
): CourseOverview {
  return {
    paragraphs: record.paragraphs.map((paragraph) => paragraph[locale]),
    sections: record.sections.map(({ title, items }) => ({
      title: title[locale],
      items: items.map((item) => item[locale]),
    })),
  }
}

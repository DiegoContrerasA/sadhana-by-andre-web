import type { Locale } from "next-intl"

import type { Course, CourseRecord } from "../schema/course.schema"

export function toCourse(record: CourseRecord, locale: Locale): Course {
  const { name, summary, lessons, ...course } = record

  return {
    ...course,
    name: name[locale],
    summary: summary[locale],
    durationMinutes: lessons.reduce(
      (total, lesson) => total + lesson.durationMinutes,
      0,
    ),
  }
}

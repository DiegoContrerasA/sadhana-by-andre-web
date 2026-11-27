import "server-only"

import { cacheLife, cacheTag } from "next/cache"
import type { Locale } from "next-intl"
import { z } from "zod"

import { cacheTags } from "@/constants/cache-tags"
import mockCourses from "@/lib/catalog/mock-courses.json"

import { type Course, courseRecordSchema } from "../schema/course.schema"

export async function getCourses(locale: Locale): Promise<Course[]> {
  "use cache"
  cacheTag(cacheTags.catalog.all, cacheTags.catalog.courses)
  cacheLife("days")

  const records = z.array(courseRecordSchema).parse(mockCourses)

  return records.map(({ name, summary, ...course }) => ({
    ...course,
    name: name[locale],
    summary: summary[locale],
  }))
}

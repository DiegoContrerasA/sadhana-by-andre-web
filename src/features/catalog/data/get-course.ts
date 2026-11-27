import "server-only"

import { cacheLife, cacheTag } from "next/cache"
import { notFound } from "next/navigation"
import type { Locale } from "next-intl"
import { z } from "zod"

import { cacheTags } from "@/constants/cache-tags"
import mockOverview from "@/lib/catalog/mock-course-overview.json"
import mockCourses from "@/lib/catalog/mock-courses.json"

import { courseRecordSchema } from "../schema/course.schema"
import { courseOverviewRecordSchema } from "../schema/course-overview.schema"
import { toCourseDetail } from "../utils/to-course-detail"

async function findCourse(locale: Locale, slug: string) {
  "use cache"
  cacheTag(cacheTags.catalog.all, cacheTags.catalog.course(slug))
  cacheLife("days")

  const records = z.array(courseRecordSchema).parse(mockCourses)
  const record = records.find((candidate) => candidate.slug === slug)

  if (!record) return null

  const overview = courseOverviewRecordSchema.parse(mockOverview)

  return toCourseDetail(record, overview, locale)
}

export async function getCourse(locale: Locale, slug: string) {
  const course = await findCourse(locale, slug)
  if (!course) notFound()

  return course
}

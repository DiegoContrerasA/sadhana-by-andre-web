import { z } from "zod"

import { courseLevels } from "./course-filters.schema"
import type { CourseOverview } from "./course-overview.schema"
import { localizedTextSchema } from "./localized-text.schema"

const lessonRecordSchema = z.object({
  slug: z.string(),
  title: localizedTextSchema,
  description: localizedTextSchema,
  durationMinutes: z.number().int().positive(),
})

export const courseRecordSchema = z.object({
  slug: z.string(),
  sanskritName: z.string(),
  name: localizedTextSchema,
  summary: localizedTextSchema,
  level: z.enum(courseLevels).optional(),
  imageUrl: z.string().optional(),
  lessons: z.array(lessonRecordSchema).nonempty(),
})

export type CourseRecord = z.infer<typeof courseRecordSchema>

export type Course = Omit<CourseRecord, "name" | "summary" | "lessons"> & {
  name: string
  summary: string
  durationMinutes: number
}

export type Lesson = {
  slug: string
  title: string
  description: string
  durationMinutes: number
}

export type CourseDetail = Course & {
  lessons: Lesson[]
  overview: CourseOverview
}

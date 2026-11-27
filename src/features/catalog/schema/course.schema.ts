import { z } from "zod"

import { courseLevels } from "./course-filters.schema"

const localizedTextSchema = z.object({ es: z.string(), en: z.string() })

export const courseRecordSchema = z.object({
  slug: z.string(),
  sanskritName: z.string(),
  name: localizedTextSchema,
  summary: localizedTextSchema,
  durationMinutes: z.number().int().positive(),
  level: z.enum(courseLevels).optional(),
  imageUrl: z.string().optional(),
})

type CourseRecord = z.infer<typeof courseRecordSchema>

export type Course = Omit<CourseRecord, "name" | "summary"> & {
  name: string
  summary: string
}

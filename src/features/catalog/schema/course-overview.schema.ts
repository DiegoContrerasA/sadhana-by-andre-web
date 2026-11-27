import { z } from "zod"

import { localizedTextSchema } from "./localized-text.schema"

export const courseOverviewRecordSchema = z.object({
  paragraphs: z.array(localizedTextSchema),
  sections: z.array(
    z.object({
      title: localizedTextSchema,
      items: z.array(localizedTextSchema),
    }),
  ),
})

export type CourseOverviewRecord = z.infer<typeof courseOverviewRecordSchema>

export type CourseOverviewSection = { title: string; items: string[] }

export type CourseOverview = {
  paragraphs: string[]
  sections: CourseOverviewSection[]
}

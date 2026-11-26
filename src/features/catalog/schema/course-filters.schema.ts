import { z } from "zod"

export const courseLevels = ["beginner", "intermediate", "advanced"] as const

export const courseFiltersSchema = z.object({
  q: z.string().trim().min(1).max(80).optional().catch(undefined),
  level: z.enum(courseLevels).optional().catch(undefined),
})

export type CourseFilters = z.infer<typeof courseFiltersSchema>

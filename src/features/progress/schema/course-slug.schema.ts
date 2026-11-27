import { z } from "zod"

export const courseSlugSchema = z
  .string()
  .max(80)
  .regex(/^[a-z0-9-]+$/)

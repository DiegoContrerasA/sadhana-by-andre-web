import { z } from "zod"

export const localizedTextSchema = z.object({ es: z.string(), en: z.string() })

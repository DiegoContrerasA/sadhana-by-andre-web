import { z } from "zod"

export function createNameSchema(required: string, length: string) {
  return z.string().trim().min(1, required).min(2, length).max(50, length)
}

"use server"

import { forgotPasswordSchema } from "../schema/forgot-password.schema"
import type { AuthResult } from "./auth-result"

export async function requestPasswordReset(
  input: unknown,
): Promise<AuthResult<"invalidInput">> {
  const parsed = forgotPasswordSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: "invalidInput" }

  return { ok: true }
}

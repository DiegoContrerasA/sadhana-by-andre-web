"use server"

import { getMockResetToken } from "../data/get-mock-reset-token"
import { resetPasswordSchema } from "../schema/reset-password.schema"
import type { AuthResult } from "./auth-result"

export async function resetPassword(
  token: unknown,
  input: unknown,
): Promise<AuthResult<"invalidToken" | "invalidInput">> {
  if (token !== getMockResetToken()) {
    return { ok: false, error: "invalidToken" }
  }
  const parsed = resetPasswordSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: "invalidInput" }

  return { ok: true }
}

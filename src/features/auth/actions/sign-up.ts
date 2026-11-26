"use server"

import { isMockEmailTaken } from "../data/is-mock-email-taken"
import { signUpSchema } from "../schema/sign-up.schema"
import type { AuthResult } from "./auth-result"

export async function signUp(
  input: unknown,
): Promise<AuthResult<"emailTaken" | "invalidInput">> {
  const parsed = signUpSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: "invalidInput" }
  if (isMockEmailTaken(parsed.data.email)) {
    return { ok: false, error: "emailTaken" }
  }

  return { ok: true }
}

"use server"

import { getMockUser } from "../data/get-mock-user"
import { signInSchema } from "../schema/sign-in.schema"
import type { AuthResult } from "./auth-result"

export async function signIn(
  input: unknown,
): Promise<AuthResult<"invalidCredentials">> {
  const parsed = signInSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: "invalidCredentials" }
  if (!getMockUser(parsed.data)) {
    return { ok: false, error: "invalidCredentials" }
  }

  return { ok: true }
}

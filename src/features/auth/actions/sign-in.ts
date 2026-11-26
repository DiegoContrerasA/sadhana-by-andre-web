"use server"

import { findMockUser } from "../data/find-mock-user"
import { signInSchema } from "../schema/sign-in.schema"
import type { SignInResult } from "./sign-in-result"

export async function signIn(input: unknown): Promise<SignInResult> {
  const parsed = signInSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: "invalidCredentials" }
  if (!findMockUser(parsed.data)) {
    return { ok: false, error: "invalidCredentials" }
  }

  return { ok: true }
}

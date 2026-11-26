"use server"

import type { AuthResult } from "./auth-result"

export async function signInWithGoogle(): Promise<AuthResult> {
  return { ok: true }
}

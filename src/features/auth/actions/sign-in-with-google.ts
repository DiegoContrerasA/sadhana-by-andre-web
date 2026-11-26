"use server"

import type { SignInResult } from "./sign-in-result"

export async function signInWithGoogle(): Promise<SignInResult> {
  return { ok: true }
}

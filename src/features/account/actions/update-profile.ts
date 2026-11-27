"use server"

import { cookies } from "next/headers"

import { preferenceCookieOptions } from "@/constants/preference-cookie"

import { profileSchema } from "../schema/profile.schema"
import { profileCookieName } from "../utils/profile-cookie"

export type UpdateProfileResult =
  | { ok: true }
  | { ok: false; error: "invalidInput" }

export async function updateProfile(
  input: unknown,
): Promise<UpdateProfileResult> {
  const parsed = profileSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: "invalidInput" }

  const cookieStore = await cookies()
  cookieStore.set(
    profileCookieName,
    JSON.stringify(parsed.data),
    preferenceCookieOptions,
  )

  return { ok: true }
}

import "server-only"

import { cookies } from "next/headers"

import mockProfile from "@/lib/account/mock-profile.json"

import { type Account, accountSchema } from "../schema/profile.schema"
import { parseSavedProfile } from "../utils/parse-saved-profile"
import { profileCookieName } from "../utils/profile-cookie"

export async function getAccount(): Promise<Account> {
  const cookieStore = await cookies()
  const saved = parseSavedProfile(cookieStore.get(profileCookieName)?.value)

  return { ...accountSchema.parse(mockProfile), ...saved }
}

import "server-only"

import { cookies } from "next/headers"

import { enrollmentCookieName } from "../utils/enrollment-cookie"
import { parseEnrolledSlugs } from "../utils/parse-enrolled-slugs"

export async function getEnrolledSlugs() {
  const cookieStore = await cookies()

  return parseEnrolledSlugs(cookieStore.get(enrollmentCookieName)?.value)
}

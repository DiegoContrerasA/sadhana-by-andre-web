import "server-only"

import { cookies } from "next/headers"

import { parseSlugList } from "@/utils/parse-slug-list"

import { enrollmentCookieName } from "../utils/enrollment-cookie"

export async function getEnrolledSlugs() {
  const cookieStore = await cookies()

  return parseSlugList(cookieStore.get(enrollmentCookieName)?.value)
}

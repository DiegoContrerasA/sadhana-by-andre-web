"use server"

import { cookies } from "next/headers"

import { preferenceCookieOptions } from "@/constants/preference-cookie"
import { slugSchema } from "@/utils/slug.schema"
import { removeSlug } from "@/utils/update-slug-list"

import { getEnrolledSlugs } from "../data/get-enrolled-slugs"
import { enrollmentCookieName } from "../utils/enrollment-cookie"
import type { EnrollmentResult } from "./enrollment-result"

export async function unenrollCourse(
  input: unknown,
): Promise<EnrollmentResult> {
  const parsed = slugSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: "unknownCourse" }

  const slugs = removeSlug(await getEnrolledSlugs(), parsed.data)
  const cookieStore = await cookies()
  cookieStore.set(
    enrollmentCookieName,
    slugs.join(","),
    preferenceCookieOptions,
  )

  return { ok: true }
}

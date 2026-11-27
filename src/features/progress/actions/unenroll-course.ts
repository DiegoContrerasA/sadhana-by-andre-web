"use server"

import { cookies } from "next/headers"

import { getEnrolledSlugs } from "../data/get-enrolled-slugs"
import { courseSlugSchema } from "../schema/course-slug.schema"
import {
  enrollmentCookieName,
  enrollmentCookieOptions,
} from "../utils/enrollment-cookie"
import type { EnrollmentResult } from "./enrollment-result"

export async function unenrollCourse(
  input: unknown,
): Promise<EnrollmentResult> {
  const parsed = courseSlugSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: "unknownCourse" }

  const slugs = (await getEnrolledSlugs()).filter(
    (slug) => slug !== parsed.data,
  )
  const cookieStore = await cookies()
  cookieStore.set(
    enrollmentCookieName,
    slugs.join(","),
    enrollmentCookieOptions,
  )

  return { ok: true }
}

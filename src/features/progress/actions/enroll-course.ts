"use server"

import { cookies } from "next/headers"

import { preferenceCookieOptions } from "@/constants/preference-cookie"
import { getCourses } from "@/features/catalog/server"
import { routing } from "@/i18n/routing"
import { slugSchema } from "@/utils/slug.schema"
import { addSlugFirst } from "@/utils/update-slug-list"

import { getEnrolledSlugs } from "../data/get-enrolled-slugs"
import { enrollmentCookieName } from "../utils/enrollment-cookie"
import type { EnrollmentResult } from "./enrollment-result"

export async function enrollCourse(input: unknown): Promise<EnrollmentResult> {
  const parsed = slugSchema.safeParse(input)
  const courses = await getCourses(routing.defaultLocale)
  const exists = courses.some((course) => course.slug === parsed.data)
  if (!parsed.success || !exists) return { ok: false, error: "unknownCourse" }

  const slugs = addSlugFirst(await getEnrolledSlugs(), parsed.data)
  const cookieStore = await cookies()
  cookieStore.set(
    enrollmentCookieName,
    slugs.join(","),
    preferenceCookieOptions,
  )

  return { ok: true }
}

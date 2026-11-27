"use server"

import { cookies } from "next/headers"

import { getCourses } from "@/features/catalog/server"
import { routing } from "@/i18n/routing"

import { getEnrolledSlugs } from "../data/get-enrolled-slugs"
import { courseSlugSchema } from "../schema/course-slug.schema"
import {
  enrollmentCookieName,
  enrollmentCookieOptions,
} from "../utils/enrollment-cookie"
import { maxEnrolledCourses } from "../utils/parse-enrolled-slugs"
import type { EnrollmentResult } from "./enrollment-result"

export async function enrollCourse(input: unknown): Promise<EnrollmentResult> {
  const parsed = courseSlugSchema.safeParse(input)
  const courses = await getCourses(routing.defaultLocale)
  const exists = courses.some((course) => course.slug === parsed.data)
  if (!parsed.success || !exists) return { ok: false, error: "unknownCourse" }

  const others = (await getEnrolledSlugs()).filter(
    (slug) => slug !== parsed.data,
  )
  const slugs = [parsed.data, ...others].slice(0, maxEnrolledCourses)
  const cookieStore = await cookies()
  cookieStore.set(
    enrollmentCookieName,
    slugs.join(","),
    enrollmentCookieOptions,
  )

  return { ok: true }
}

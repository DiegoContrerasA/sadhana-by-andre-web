import "server-only"

import type { Metadata } from "next"
import type { Locale } from "next-intl"

import { siteName } from "@/constants/site"

import { getCourse } from "./get-course"

export async function getCourseMetadata(
  locale: Locale,
  slug: string,
): Promise<Metadata> {
  const course = await getCourse(locale, slug)

  return {
    title: `${course.name} | ${siteName}`,
    description: course.summary,
    robots: { index: false, follow: false },
  }
}

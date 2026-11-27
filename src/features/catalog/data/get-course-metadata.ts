import "server-only"

import type { Metadata } from "next"
import type { Locale } from "next-intl"

import { siteName } from "@/constants/site"

import { getLesson } from "./get-lesson"

export async function getCourseMetadata(
  locale: Locale,
  slug: string,
  lessonSlug?: string,
): Promise<Metadata> {
  const { course, lesson } = await getLesson(locale, slug, lessonSlug)
  const pageName = lessonSlug ? `${lesson.title} · ${course.name}` : course.name

  return {
    title: `${pageName} | ${siteName}`,
    description: lessonSlug ? lesson.description : course.summary,
    robots: { index: false, follow: false },
  }
}

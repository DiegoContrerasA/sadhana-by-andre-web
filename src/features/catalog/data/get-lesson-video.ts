import "server-only"

import type { Locale } from "next-intl"

export async function getLessonVideo(locale: Locale) {
  return {
    src: "/videos/sample-lesson.mp4",
    posterUrl: "/videos/sample-lesson.jpg",
    captionsUrl: `/videos/sample-lesson.${locale}.vtt`,
    captionsLocale: locale,
  }
}

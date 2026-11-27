import type { Lesson } from "../schema/course.schema"

export function buildLessonHref(
  courseHref: string,
  lessons: Lesson[],
  lesson: Lesson,
) {
  if (lesson.slug === lessons[0]?.slug) return courseHref

  return `${courseHref}/${lesson.slug}`
}

import type { Lesson } from "../schema/course.schema"

export function getLessonPosition(lessons: Lesson[], lessonSlug?: string) {
  const index = lessonSlug
    ? lessons.findIndex((lesson) => lesson.slug === lessonSlug)
    : 0
  const lesson = lessons[index]
  if (!lesson) return undefined

  return {
    index,
    lesson,
    previous: lessons[index - 1],
    next: lessons[index + 1],
  }
}

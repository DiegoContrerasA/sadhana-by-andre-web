export function isLessonLocked(lessonIndex: number, hasAccess: boolean) {
  return lessonIndex > 0 && !hasAccess
}

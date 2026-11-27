import type { Locale, Messages } from "next-intl"
import { getTranslations } from "next-intl/server"

import { getLessonVideo } from "../data/get-lesson-video"
import type { CourseDetail, Lesson } from "../schema/course.schema"
import type { CourseAccess } from "../schema/course-access.schema"
import { isLessonLocked } from "../utils/is-lesson-locked"
import { LessonVideo } from "./lesson-video"
import { LockedLesson } from "./locked-lesson"

type GatedLessonVideoProps = {
  locale: Locale
  copy: Messages["catalog"]["lesson"]
  course: CourseDetail
  lesson: Lesson
  lessonIndex: number
  access: CourseAccess
}

export async function GatedLessonVideo({
  locale,
  copy,
  course,
  lesson,
  lessonIndex,
  access,
}: GatedLessonVideoProps) {
  const isFree = !isLessonLocked(lessonIndex, false)
  const isOpen = isFree || (await access.hasAccess(course.slug))
  if (!isOpen) {
    return (
      <LockedLesson title={copy.lockedTitle} imageUrl={course.imageUrl}>
        {access.renderUnlockAction(course.slug)}
      </LockedLesson>
    )
  }

  const [t, video] = await Promise.all([
    getTranslations("catalog.lesson"),
    getLessonVideo(locale),
  ])

  return (
    <LessonVideo
      key={`${course.slug}/${lesson.slug}`}
      {...video}
      label={t("video", { title: lesson.title })}
      captionsLabel={copy.captions}
    />
  )
}

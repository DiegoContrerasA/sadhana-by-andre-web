import { useId } from "react"

import type { Lesson } from "../schema/course.schema"
import { buildLessonHref } from "../utils/build-lesson-href"
import { LessonListItem } from "./lesson-list-item"

type LessonListProps = {
  title: string
  summaryLabel: string
  courseHref: string
  lessons: Lesson[]
  currentSlug: string
}

export function LessonList({
  title,
  summaryLabel,
  courseHref,
  lessons,
  currentSlug,
}: LessonListProps) {
  const titleId = useId()

  return (
    <aside
      aria-labelledby={titleId}
      className="flex flex-col gap-3 rounded-xl border border-primary/15 bg-background p-3"
    >
      <div className="flex items-baseline justify-between gap-3 px-3 pt-2">
        <h2 id={titleId} className="text-xl">
          {title}
        </h2>
        <p className="text-xs text-muted-foreground">{summaryLabel}</p>
      </div>
      <ol className="flex flex-col gap-1">
        {lessons.map((lesson, index) => (
          <LessonListItem
            key={lesson.slug}
            position={index + 1}
            title={lesson.title}
            durationMinutes={lesson.durationMinutes}
            href={buildLessonHref(courseHref, lessons, lesson)}
            isCurrent={lesson.slug === currentSlug}
          />
        ))}
      </ol>
    </aside>
  )
}

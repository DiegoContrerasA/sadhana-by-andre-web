import type { Messages } from "next-intl"
import { useId } from "react"

import type { Lesson } from "../schema/course.schema"
import { buildLessonHref } from "../utils/build-lesson-href"
import { isLessonLocked } from "../utils/is-lesson-locked"
import { LessonListItem } from "./lesson-list-item"

type LessonListProps = {
  copy: Messages["catalog"]["lesson"]
  summaryLabel: string
  courseHref: string
  lessons: Lesson[]
  currentSlug: string
  hasAccess: boolean
}

export function LessonList({
  copy,
  summaryLabel,
  courseHref,
  lessons,
  currentSlug,
  hasAccess,
}: LessonListProps) {
  const titleId = useId()

  return (
    <aside
      aria-labelledby={titleId}
      className="flex flex-col gap-3 rounded-xl border border-primary/15 bg-background p-3"
    >
      <div className="flex items-baseline justify-between gap-3 px-3 pt-2">
        <h2 id={titleId} className="text-xl">
          {copy.content}
        </h2>
        <p className="text-xs text-muted-foreground">{summaryLabel}</p>
      </div>
      <ol className="flex flex-col gap-1">
        {lessons.map((lesson, index) => {
          const isLocked = isLessonLocked(index, hasAccess)

          return (
            <LessonListItem
              key={lesson.slug}
              position={index + 1}
              lesson={lesson}
              href={buildLessonHref(courseHref, lessons, lesson)}
              isCurrent={lesson.slug === currentSlug}
              isLocked={isLocked}
              showsDescription={!hasAccess}
              badgeLabel={!hasAccess && !isLocked ? copy.free : undefined}
              lockedLabel={copy.locked}
            />
          )
        })}
      </ol>
    </aside>
  )
}

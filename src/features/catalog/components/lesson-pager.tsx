import type { Messages } from "next-intl"

import type { Lesson } from "../schema/course.schema"
import { buildLessonHref } from "../utils/build-lesson-href"
import { LessonPagerLink } from "./lesson-pager-link"

type LessonPagerProps = {
  copy: Messages["catalog"]["lesson"]
  courseHref: string
  lessons: Lesson[]
  previous?: Lesson
  next?: Lesson
}

export function LessonPager({
  copy,
  courseHref,
  lessons,
  previous,
  next,
}: LessonPagerProps) {
  return (
    <nav aria-label={copy.pager} className="flex items-stretch gap-3">
      {previous ? (
        <LessonPagerLink
          direction="previous"
          href={buildLessonHref(courseHref, lessons, previous)}
          label={copy.previous}
          title={previous.title}
        />
      ) : null}
      {next ? (
        <LessonPagerLink
          direction="next"
          href={buildLessonHref(courseHref, lessons, next)}
          label={copy.next}
          title={next.title}
        />
      ) : null}
    </nav>
  )
}

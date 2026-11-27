import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import type { Lesson } from "../schema/course.schema"
import { formatDuration } from "../utils/format-duration"
import { LessonMarker } from "./lesson-marker"

type LessonListItemProps = {
  position: number
  lesson: Lesson
  href: string
  isCurrent: boolean
  isLocked: boolean
  showsDescription: boolean
  badgeLabel?: string
  lockedLabel: string
}

export function LessonListItem({
  position,
  lesson,
  href,
  isCurrent,
  isLocked,
  showsDescription,
  badgeLabel,
  lockedLabel,
}: LessonListItemProps) {
  return (
    <li>
      <Link
        href={href}
        aria-current={isCurrent ? "page" : undefined}
        className={cn(
          "flex items-start gap-3 rounded-lg px-3 py-3 text-sm transition-colors outline-none hover:bg-accent/40 focus-visible:ring-3 focus-visible:ring-ring",
          isCurrent && "bg-accent/60 text-primary hover:bg-accent/60",
        )}
      >
        <LessonMarker
          position={position}
          isCurrent={isCurrent}
          isLocked={isLocked}
        />
        <span className="flex min-w-0 flex-1 flex-col items-start gap-1 pt-1">
          <span>{lesson.title}</span>
          {badgeLabel ? <Badge variant="soft">{badgeLabel}</Badge> : null}
          {showsDescription ? (
            <span className="line-clamp-4 text-xs leading-relaxed text-muted-foreground">
              {lesson.description}
            </span>
          ) : null}
          {isLocked ? <span className="sr-only">{lockedLabel}</span> : null}
        </span>
        <span className="shrink-0 pt-1.5 text-xs text-muted-foreground">
          {formatDuration(lesson.durationMinutes)}
        </span>
      </Link>
    </li>
  )
}

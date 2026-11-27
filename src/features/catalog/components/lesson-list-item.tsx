import { PlayIcon } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { formatDuration } from "../utils/format-duration"

type LessonListItemProps = {
  position: number
  title: string
  durationMinutes: number
  href: string
  isCurrent: boolean
}

export function LessonListItem({
  position,
  title,
  durationMinutes,
  href,
  isCurrent,
}: LessonListItemProps) {
  return (
    <li>
      <Link
        href={href}
        aria-current={isCurrent ? "page" : undefined}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors outline-none hover:bg-accent/40 focus-visible:ring-3 focus-visible:ring-ring",
          isCurrent && "bg-accent/60 text-primary hover:bg-accent/60",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/25 text-xs text-primary",
            isCurrent && "border-primary bg-primary text-primary-foreground",
          )}
        >
          {isCurrent ? <PlayIcon className="size-3 fill-current" /> : position}
        </span>
        <span className="flex-1">{title}</span>
        <span className="shrink-0 text-xs text-muted-foreground">
          {formatDuration(durationMinutes)}
        </span>
      </Link>
    </li>
  )
}

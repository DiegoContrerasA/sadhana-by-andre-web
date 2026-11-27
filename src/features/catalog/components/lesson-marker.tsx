import { LockIcon, PlayIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type LessonMarkerProps = {
  position: number
  isCurrent: boolean
  isLocked: boolean
}

export function LessonMarker({
  position,
  isCurrent,
  isLocked,
}: LessonMarkerProps) {
  let content = <>{position}</>
  if (isCurrent) content = <PlayIcon className="size-3 fill-current" />
  if (isLocked) content = <LockIcon className="size-3" />

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-full border border-primary/25 text-xs text-primary",
        isCurrent && "border-primary bg-primary text-primary-foreground",
      )}
    >
      {content}
    </span>
  )
}

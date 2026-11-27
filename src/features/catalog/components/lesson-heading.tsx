import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"

type LessonHeadingProps = {
  courseName: string
  sanskritName: string
  title: string
  description: string
  positionLabel: string
  levelLabel?: string
  action?: ReactNode
}

export function LessonHeading({
  courseName,
  sanskritName,
  title,
  description,
  positionLabel,
  levelLabel,
  action,
}: LessonHeadingProps) {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <p>{positionLabel}</p>
        {levelLabel ? <Badge variant="soft">{levelLabel}</Badge> : null}
      </div>
      <div className="flex items-center gap-3">
        <p className="text-sm text-primary">
          {courseName} · <i lang="sa-Latn">{sanskritName}</i>
        </p>
        {action}
      </div>
      <h1 className="text-3xl leading-tight md:text-4xl">{title}</h1>
      <p className="max-w-2xl text-muted-foreground">{description}</p>
    </div>
  )
}

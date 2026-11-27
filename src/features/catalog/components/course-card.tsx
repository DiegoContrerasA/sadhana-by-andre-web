import { ClockIcon, PlayIcon } from "lucide-react"
import Link from "next/link"
import type { Messages } from "next-intl"
import type { ReactNode } from "react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { Course } from "../schema/course.schema"
import { formatDuration } from "../utils/format-duration"
import { CourseCover } from "./course-cover"

const coverSizes = "(min-width: 1152px) 360px, (min-width: 768px) 33vw, 50vw"

type CourseCardProps = {
  copy: Messages["catalog"]["card"]
  course: Course
  href: string
  levelLabel?: string
  isEager?: boolean
  action?: ReactNode
}

export function CourseCard({
  copy,
  course,
  href,
  levelLabel,
  isEager,
  action,
}: CourseCardProps) {
  const { slug, name, sanskritName, summary, durationMinutes } = course
  const titleId = `course-${slug}`

  return (
    <article className="group @container relative aspect-4/5 overflow-hidden rounded-xl bg-overlay text-overlay-foreground has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-ring">
      <CourseCover
        imageUrl={course.imageUrl}
        sizes={coverSizes}
        isEager={isEager}
        className="transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
      />
      <div className="absolute inset-0 bg-linear-to-t from-overlay/90 via-30% via-overlay/45 to-60% to-transparent" />
      <div className="absolute inset-0 bg-overlay/50 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none pointer-coarse:hidden" />
      <div className="absolute inset-x-0 bottom-0 flex translate-y-32 flex-col gap-2 p-3 transition-transform duration-300 group-focus-within:translate-y-0 group-hover:translate-y-0 motion-reduce:transition-none sm:p-4 pointer-coarse:translate-y-0">
        {levelLabel ? (
          <Badge variant="outline-inverse">{levelLabel}</Badge>
        ) : null}
        <h2 id={titleId} className="text-lg leading-snug sm:text-xl">
          {name}
        </h2>
        <div className="flex h-30 flex-col gap-2 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none pointer-coarse:h-auto pointer-coarse:opacity-100">
          <p lang="sa-Latn" className="text-xs italic pointer-coarse:hidden">
            {sanskritName}
          </p>
          <p className="line-clamp-2 hidden text-sm text-overlay-foreground/85 @3xs:[display:-webkit-box] pointer-coarse:hidden">
            {summary}
          </p>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-sm">
              <ClockIcon aria-hidden="true" className="size-4" />
              <span className="sr-only">{copy.duration}: </span>
              {formatDuration(durationMinutes)}
            </p>
            <span
              aria-hidden="true"
              className={cn(
                buttonVariants({ variant: "outline-inverse", size: "sm" }),
                "pointer-coarse:hidden",
              )}
            >
              <PlayIcon />
              {copy.open}
            </span>
          </div>
        </div>
      </div>
      <Link
        href={href}
        aria-labelledby={titleId}
        className="absolute inset-0 z-10 outline-none"
      />
      {action ? (
        <div className="absolute top-2 right-2 z-20 sm:top-3 sm:right-3">
          {action}
        </div>
      ) : null}
    </article>
  )
}

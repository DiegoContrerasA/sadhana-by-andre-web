import { ArrowLeftIcon, ClockIcon } from "lucide-react"
import type { Locale } from "next-intl"
import { getMessages } from "next-intl/server"

import { LinkButton } from "@/components/link-button"
import { Badge } from "@/components/ui/badge"

import { CourseCover } from "../components/course-cover"
import { getCourse } from "../data/get-course"
import { formatDuration } from "../utils/format-duration"

const coverSizes = "(min-width: 768px) 420px, 100vw"

type CourseDetailScreenProps = {
  locale: Locale
  slug: string
  backHref: string
}

export async function CourseDetailScreen({
  locale,
  slug,
  backHref,
}: CourseDetailScreenProps) {
  const [{ catalog }, course] = await Promise.all([
    getMessages(),
    getCourse(locale, slug),
  ])
  const { name, sanskritName, summary, level, durationMinutes } = course

  return (
    <article className="flex flex-col items-start gap-6">
      <LinkButton href={backHref} variant="link" size="sm" className="px-0">
        <ArrowLeftIcon aria-hidden="true" />
        {catalog.detail.back}
      </LinkButton>
      <div className="grid w-full gap-8 md:grid-cols-[minmax(0,26rem)_1fr]">
        <div className="relative aspect-4/5 overflow-hidden rounded-xl">
          <CourseCover imageUrl={course.imageUrl} sizes={coverSizes} isEager />
        </div>
        <div className="flex flex-col items-start gap-4">
          <p lang="sa-Latn" className="text-sm text-primary italic">
            {sanskritName}
          </p>
          <h1 className="text-3xl leading-tight md:text-5xl">{name}</h1>
          {level ? <Badge variant="soft">{catalog.levels[level]}</Badge> : null}
          <p className="flex items-center gap-1.5 text-sm">
            <ClockIcon aria-hidden="true" className="size-4 text-primary" />
            {catalog.card.duration}: {formatDuration(durationMinutes)}
          </p>
          <p className="text-muted-foreground">{summary}</p>
          <p className="w-full rounded-lg border border-primary/15 bg-background p-4 text-sm text-muted-foreground">
            {catalog.detail.soon}
          </p>
        </div>
      </div>
    </article>
  )
}

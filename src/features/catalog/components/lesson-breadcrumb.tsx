import Link from "next/link"

type LessonBreadcrumbProps = {
  label: string
  exploreLabel: string
  exploreHref: string
  courseName: string
  courseHref: string
  lessonTitle: string
}

const linkClassName =
  "rounded-sm underline-offset-4 outline-none hover:text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring"

export function LessonBreadcrumb({
  label,
  exploreLabel,
  exploreHref,
  courseName,
  courseHref,
  lessonTitle,
}: LessonBreadcrumbProps) {
  return (
    <nav aria-label={label} className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 *:not-first:before:mr-2 *:not-first:before:content-['/']">
        <li>
          <Link href={exploreHref} className={linkClassName}>
            {exploreLabel}
          </Link>
        </li>
        <li>
          <Link href={courseHref} className={linkClassName}>
            {courseName}
          </Link>
        </li>
        <li aria-current="page" className="text-primary">
          {lessonTitle}
        </li>
      </ol>
    </nav>
  )
}

import type { Messages } from "next-intl"

import type { Course } from "../schema/course.schema"
import { CourseGrid } from "./course-grid"
import { EmptyCourses } from "./empty-courses"

type CourseResultsProps = {
  copy: Messages["catalog"]
  basePath: string
  courses: Course[]
  countLabel: string
  favoriteCopy: Messages["favorites"]["button"]
  favoriteSlugs: string[]
}

export function CourseResults({
  copy,
  basePath,
  courses,
  countLabel,
  favoriteCopy,
  favoriteSlugs,
}: CourseResultsProps) {
  if (courses.length === 0) return <EmptyCourses copy={copy.empty} />

  return (
    <div className="flex flex-col gap-4">
      <p role="status" className="text-sm text-muted-foreground">
        {countLabel}
      </p>
      <CourseGrid
        copy={copy}
        basePath={basePath}
        courses={courses}
        favoriteCopy={favoriteCopy}
        favoriteSlugs={favoriteSlugs}
      />
    </div>
  )
}

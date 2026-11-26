import { getMessages } from "next-intl/server"
import { Suspense } from "react"

import { SectionHeading } from "@/components/section-heading"

import { CourseFiltersSkeleton } from "../components/course-filters-skeleton"
import { UrlCourseFilters } from "../components/url-course-filters"

type CoursesScreenProps = {
  basePath: string
  searchParams: Promise<unknown>
}

export async function CoursesScreen({
  basePath,
  searchParams,
}: CoursesScreenProps) {
  const { app, catalog } = await getMessages()
  const { title, heading, headingEm, subtitle } = app.sections.courses

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        label={title}
        heading={heading}
        headingEm={headingEm}
        subtitle={subtitle}
      />
      <Suspense fallback={<CourseFiltersSkeleton />}>
        <UrlCourseFilters basePath={basePath} searchParams={searchParams} />
      </Suspense>
      <p className="rounded-lg border border-primary/15 bg-background px-6 py-16 text-center text-sm text-muted-foreground">
        {catalog.listSoon}
      </p>
    </div>
  )
}

import type { Locale } from "next-intl"
import { getMessages } from "next-intl/server"
import { Suspense } from "react"

import { SectionHeading } from "@/components/section-heading"

import { CourseCatalogSkeleton } from "../components/course-catalog-skeleton"
import { UrlCourseCatalog } from "../components/url-course-catalog"

type CoursesScreenProps = {
  locale: Locale
  basePath: string
  searchParams: Promise<unknown>
}

export async function CoursesScreen({
  locale,
  basePath,
  searchParams,
}: CoursesScreenProps) {
  const { app } = await getMessages()
  const { title, heading, headingEm, subtitle } = app.sections.courses

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        label={title}
        heading={heading}
        headingEm={headingEm}
        subtitle={subtitle}
      />
      <Suspense fallback={<CourseCatalogSkeleton />}>
        <UrlCourseCatalog
          locale={locale}
          basePath={basePath}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  )
}

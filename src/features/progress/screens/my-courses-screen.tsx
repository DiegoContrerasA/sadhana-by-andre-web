import type { Locale } from "next-intl"
import { getMessages } from "next-intl/server"
import { Suspense } from "react"

import { SectionHeading } from "@/components/section-heading"

import { CollectionSkeleton } from "../components/collection-skeleton"
import { SavedCourses } from "../components/saved-courses"

type MyCoursesScreenProps = {
  locale: Locale
  coursesHref: string
}

export async function MyCoursesScreen({
  locale,
  coursesHref,
}: MyCoursesScreenProps) {
  const { app } = await getMessages()
  const { title, heading, headingEm, subtitle } = app.sections.myCourses

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        label={title}
        heading={heading}
        headingEm={headingEm}
        subtitle={subtitle}
      />
      <Suspense fallback={<CollectionSkeleton />}>
        <SavedCourses locale={locale} coursesHref={coursesHref} />
      </Suspense>
    </div>
  )
}

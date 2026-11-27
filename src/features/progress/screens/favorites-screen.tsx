import type { Locale } from "next-intl"
import { getMessages } from "next-intl/server"
import { Suspense } from "react"

import { SectionHeading } from "@/components/section-heading"

import { CollectionSkeleton } from "../components/collection-skeleton"
import { FavoriteCourses } from "../components/favorite-courses"

type FavoritesScreenProps = {
  locale: Locale
  coursesHref: string
}

export async function FavoritesScreen({
  locale,
  coursesHref,
}: FavoritesScreenProps) {
  const { app } = await getMessages()
  const { title, heading, headingEm, subtitle } = app.sections.favorites

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        label={title}
        heading={heading}
        headingEm={headingEm}
        subtitle={subtitle}
      />
      <Suspense fallback={<CollectionSkeleton />}>
        <FavoriteCourses locale={locale} coursesHref={coursesHref} />
      </Suspense>
    </div>
  )
}

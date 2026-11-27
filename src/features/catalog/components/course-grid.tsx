"use client"

import type { Messages } from "next-intl"

import { Button } from "@/components/ui/button"
import { FavoriteButton } from "@/features/favorites"

import { useInfiniteReveal } from "../hooks/use-infinite-reveal"
import type { Course } from "../schema/course.schema"
import { CourseCard } from "./course-card"

const eagerCardCount = 3

type CourseGridProps = {
  copy: Messages["catalog"]
  basePath: string
  courses: Course[]
  favoriteCopy: Messages["favorites"]["button"]
  favoriteSlugs: string[]
}

export function CourseGrid({
  copy,
  basePath,
  courses,
  favoriteCopy,
  favoriteSlugs,
}: CourseGridProps) {
  const { visibleCount, hasMore, sentinelRef, showMore } = useInfiniteReveal(
    courses.length,
  )

  return (
    <div className="flex flex-col gap-6">
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
        {courses.slice(0, visibleCount).map((course, index) => (
          <li key={course.slug}>
            <CourseCard
              copy={copy.card}
              course={course}
              href={`${basePath}/${course.slug}`}
              levelLabel={course.level ? copy.levels[course.level] : undefined}
              isEager={index < eagerCardCount}
              action={
                <FavoriteButton
                  copy={favoriteCopy}
                  slug={course.slug}
                  courseName={course.name}
                  isFavorite={favoriteSlugs.includes(course.slug)}
                />
              }
            />
          </li>
        ))}
      </ul>
      {hasMore ? (
        <div ref={sentinelRef} className="flex justify-center">
          <Button variant="outline-primary" size="pill" onClick={showMore}>
            {copy.loadMore}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

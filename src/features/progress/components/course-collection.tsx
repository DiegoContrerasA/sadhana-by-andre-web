import { getMessages } from "next-intl/server"

import { type Course, CourseCard } from "@/features/catalog"
import { FavoriteButton } from "@/features/favorites"
import { getFavoriteSlugs } from "@/features/favorites/server"

const eagerCardCount = 3

type CourseCollectionProps = {
  courses: Course[]
  coursesHref: string
  countLabel: string
}

export async function CourseCollection({
  courses,
  coursesHref,
  countLabel,
}: CourseCollectionProps) {
  const [{ catalog, favorites }, favoriteSlugs] = await Promise.all([
    getMessages(),
    getFavoriteSlugs(),
  ])

  return (
    <div className="flex flex-col gap-4">
      <p role="status" className="text-sm text-muted-foreground">
        {countLabel}
      </p>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
        {courses.map((course, index) => (
          <li key={course.slug}>
            <CourseCard
              copy={catalog.card}
              course={course}
              href={`${coursesHref}/${course.slug}`}
              levelLabel={
                course.level ? catalog.levels[course.level] : undefined
              }
              isEager={index < eagerCardCount}
              action={
                <FavoriteButton
                  copy={favorites.button}
                  slug={course.slug}
                  courseName={course.name}
                  isFavorite={favoriteSlugs.includes(course.slug)}
                />
              }
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

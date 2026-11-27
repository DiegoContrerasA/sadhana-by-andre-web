import type { Locale } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { Suspense } from "react"

import { SavedFavoriteButton } from "@/features/favorites/server"
import { getLesson } from "../data/get-lesson"
import type { CourseAccess } from "../schema/course-access.schema"
import { CourseOverview } from "./course-overview"
import { GatedLessonList } from "./gated-lesson-list"
import { GatedLessonVideo } from "./gated-lesson-video"
import { LessonBreadcrumb } from "./lesson-breadcrumb"
import { LessonHeading } from "./lesson-heading"
import { LessonPager } from "./lesson-pager"
import { LessonPlaceholder } from "./lesson-placeholder"

type UrlCourseLessonProps = {
  locale: Locale
  exploreHref: string
  params: Promise<{ slug: string; lesson?: string }>
  access: CourseAccess
}

export async function UrlCourseLesson({
  locale,
  exploreHref,
  params,
  access,
}: UrlCourseLessonProps) {
  const { slug, lesson: lessonSlug } = await params
  const courseHref = `${exploreHref}/${slug}`
  const [{ catalog }, t, current] = await Promise.all([
    getMessages(),
    getTranslations("catalog.lesson"),
    getLesson(locale, slug, lessonSlug),
  ])
  const { course, lesson, index, previous, next } = current
  const { lessons, level } = course

  return (
    <article className="flex flex-col gap-5">
      <LessonBreadcrumb
        label={catalog.lesson.breadcrumb}
        exploreLabel={catalog.lesson.explore}
        exploreHref={exploreHref}
        courseName={course.name}
        courseHref={courseHref}
        lessonTitle={lesson.title}
      />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:grid-rows-[auto_1fr] lg:items-start">
        <div className="flex flex-col gap-6">
          <Suspense fallback={<LessonPlaceholder className="aspect-video" />}>
            <GatedLessonVideo
              locale={locale}
              copy={catalog.lesson}
              course={course}
              lesson={lesson}
              lessonIndex={index}
              access={access}
            />
          </Suspense>
          <LessonPager
            copy={catalog.lesson}
            courseHref={courseHref}
            lessons={lessons}
            previous={previous}
            next={next}
          />
          <LessonHeading
            courseName={course.name}
            sanskritName={course.sanskritName}
            title={lesson.title}
            description={lesson.description}
            positionLabel={t("position", {
              current: index + 1,
              total: lessons.length,
            })}
            levelLabel={level ? catalog.levels[level] : undefined}
            action={
              <Suspense fallback={<LessonPlaceholder className="size-10" />}>
                <SavedFavoriteButton slug={slug} courseName={course.name} />
              </Suspense>
            }
          />
        </div>
        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {access.renderPanel(slug, lessons.length)}
          <Suspense fallback={<LessonPlaceholder className="h-72" />}>
            <GatedLessonList
              courseHref={courseHref}
              course={course}
              currentSlug={lesson.slug}
              access={access}
            />
          </Suspense>
        </div>
        <CourseOverview
          title={catalog.lesson.overview}
          overview={course.overview}
        />
      </div>
    </article>
  )
}

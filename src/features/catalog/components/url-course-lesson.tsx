import type { Locale } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { getLesson } from "../data/get-lesson"
import { getLessonVideo } from "../data/get-lesson-video"
import { formatDuration } from "../utils/format-duration"
import { CourseOverview } from "./course-overview"
import { LessonBreadcrumb } from "./lesson-breadcrumb"
import { LessonHeading } from "./lesson-heading"
import { LessonList } from "./lesson-list"
import { LessonPager } from "./lesson-pager"
import { LessonVideo } from "./lesson-video"

type UrlCourseLessonProps = {
  locale: Locale
  exploreHref: string
  params: Promise<{ slug: string; lesson?: string }>
}

export async function UrlCourseLesson({
  locale,
  exploreHref,
  params,
}: UrlCourseLessonProps) {
  const { slug, lesson: lessonSlug } = await params
  const courseHref = `${exploreHref}/${slug}`
  const [{ catalog }, t, video, current] = await Promise.all([
    getMessages(),
    getTranslations("catalog.lesson"),
    getLessonVideo(locale),
    getLesson(locale, slug, lessonSlug),
  ])
  const { course, lesson, index, previous, next } = current
  const { lessons, level } = course
  const countLabel = t("count", { count: lessons.length })

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
          <LessonVideo
            key={`${slug}/${lesson.slug}`}
            {...video}
            label={t("video", { title: lesson.title })}
            captionsLabel={catalog.lesson.captions}
          />
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
          />
        </div>
        <div className="lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <LessonList
            title={catalog.lesson.content}
            summaryLabel={`${countLabel} · ${formatDuration(course.durationMinutes)}`}
            courseHref={courseHref}
            lessons={lessons}
            currentSlug={lesson.slug}
          />
        </div>
        <CourseOverview
          title={catalog.lesson.overview}
          overview={course.overview}
        />
      </div>
    </article>
  )
}

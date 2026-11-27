import { useId } from "react"

import type { CourseOverview as Overview } from "../schema/course-overview.schema"
import { CourseOverviewSection } from "./course-overview-section"

type CourseOverviewProps = {
  title: string
  overview: Overview
}

export function CourseOverview({ title, overview }: CourseOverviewProps) {
  const titleId = useId()

  return (
    <section
      aria-labelledby={titleId}
      className="flex max-w-2xl flex-col gap-6 border-t border-primary/15 pt-8 leading-relaxed text-muted-foreground"
    >
      <h2 id={titleId} className="text-2xl text-foreground">
        {title}
      </h2>
      {overview.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {overview.sections.map((section) => (
        <CourseOverviewSection key={section.title} {...section} />
      ))}
    </section>
  )
}

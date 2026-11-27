import type { CourseOverviewSection as Section } from "../schema/course-overview.schema"

export function CourseOverviewSection({ title, items }: Section) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xl text-foreground">{title}</h3>
      <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-primary">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

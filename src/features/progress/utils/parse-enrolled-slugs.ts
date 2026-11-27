import { courseSlugSchema } from "../schema/course-slug.schema"

export const maxEnrolledCourses = 100

export function parseEnrolledSlugs(value = "") {
  const slugs = value
    .split(",")
    .filter((slug) => courseSlugSchema.safeParse(slug).success)

  return [...new Set(slugs)].slice(0, maxEnrolledCourses)
}

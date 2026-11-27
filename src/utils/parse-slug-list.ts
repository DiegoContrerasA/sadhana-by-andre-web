import { slugSchema } from "./slug.schema"

export const maxSavedSlugs = 100

export function parseSlugList(value = "") {
  const slugs = value
    .split(",")
    .filter((slug) => slugSchema.safeParse(slug).success)

  return [...new Set(slugs)].slice(0, maxSavedSlugs)
}

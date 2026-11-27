import "server-only"

import { getEnrolledSlugs } from "./get-enrolled-slugs"

export async function isCourseEnrolled(slug: string) {
  const slugs = await getEnrolledSlugs()

  return slugs.includes(slug)
}

import { maxSavedSlugs } from "./parse-slug-list"

export function removeSlug(slugs: string[], slug: string) {
  return slugs.filter((saved) => saved !== slug)
}

export function addSlugFirst(slugs: string[], slug: string) {
  return [slug, ...removeSlug(slugs, slug)].slice(0, maxSavedSlugs)
}

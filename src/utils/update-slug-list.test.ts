import { describe, expect, it } from "vitest"

import { maxSavedSlugs } from "./parse-slug-list"
import { addSlugFirst, removeSlug } from "./update-slug-list"

describe("addSlugFirst", () => {
  it("moves the slug to the front without repeating it", () => {
    expect(addSlugFirst(["tree", "crow"], "crow")).toEqual(["crow", "tree"])
  })

  it("drops the oldest entry past the limit", () => {
    const full = Array.from({ length: maxSavedSlugs }, (_, i) => `pose-${i}`)

    const result = addSlugFirst(full, "tree")

    expect(result).toHaveLength(maxSavedSlugs)
    expect(result[0]).toBe("tree")
  })
})

describe("removeSlug", () => {
  it("removes only that slug", () => {
    expect(removeSlug(["tree", "crow"], "tree")).toEqual(["crow"])
  })
})

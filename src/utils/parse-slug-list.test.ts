import { describe, expect, it } from "vitest"

import { maxSavedSlugs, parseSlugList } from "./parse-slug-list"

describe("parseSlugList", () => {
  it("returns nothing without a saved value", () => {
    expect(parseSlugList()).toEqual([])
    expect(parseSlugList("")).toEqual([])
  })

  it("keeps the order and drops duplicates and invalid entries", () => {
    expect(parseSlugList("crow,tree,crow,<script>, ,Tree")).toEqual([
      "crow",
      "tree",
    ])
  })

  it("limits how many slugs it reads", () => {
    const value = Array.from({ length: 130 }, (_, i) => `pose-${i}`).join(",")

    expect(parseSlugList(value)).toHaveLength(maxSavedSlugs)
  })
})

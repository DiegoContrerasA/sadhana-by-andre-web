import { describe, expect, it } from "vitest"

import { maxEnrolledCourses, parseEnrolledSlugs } from "./parse-enrolled-slugs"

describe("parseEnrolledSlugs", () => {
  it("returns nothing without a saved value", () => {
    expect(parseEnrolledSlugs()).toEqual([])
    expect(parseEnrolledSlugs("")).toEqual([])
  })

  it("keeps the order and drops duplicates and invalid entries", () => {
    expect(parseEnrolledSlugs("crow,tree,crow,<script>, ,Tree")).toEqual([
      "crow",
      "tree",
    ])
  })

  it("limits how many courses it reads", () => {
    const value = Array.from({ length: 130 }, (_, i) => `pose-${i}`).join(",")

    expect(parseEnrolledSlugs(value)).toHaveLength(maxEnrolledCourses)
  })
})

import { describe, expect, it } from "vitest"

import { courseFiltersSchema } from "./course-filters.schema"

describe("courseFiltersSchema", () => {
  it("keeps the known filters and trims the search", () => {
    expect(
      courseFiltersSchema.parse({ q: "  cadera ", level: "beginner" }),
    ).toEqual({ q: "cadera", level: "beginner" })
  })

  it("ignores values that are invalid, repeated or too long", () => {
    const filters = courseFiltersSchema.parse({
      q: "x".repeat(81),
      level: ["beginner", "advanced"],
    })

    expect(Object.values(filters).filter(Boolean)).toEqual([])
    expect(courseFiltersSchema.parse({ level: "expert" }).level).toBeUndefined()
  })
})

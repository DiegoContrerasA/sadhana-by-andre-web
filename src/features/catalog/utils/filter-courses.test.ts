import { describe, expect, it } from "vitest"

import type { Course } from "../schema/course.schema"
import { filterCourses } from "./filter-courses"

const courses: Course[] = [
  {
    slug: "tree",
    name: "Árbol",
    sanskritName: "Vrksasana",
    summary: "",
    durationMinutes: 14,
    level: "beginner",
  },
  {
    slug: "child",
    name: "Niño",
    sanskritName: "Balasana",
    summary: "",
    durationMinutes: 7,
  },
]

function slugs(filters: Parameters<typeof filterCourses>[1]) {
  return filterCourses(courses, filters).map((course) => course.slug)
}

describe("filterCourses", () => {
  it("returns every course without filters", () => {
    expect(slugs({})).toEqual(["tree", "child"])
  })

  it("ignores accents and letter case", () => {
    expect(slugs({ q: "arbol" })).toEqual(["tree"])
    expect(slugs({ q: "NINO" })).toEqual(["child"])
  })

  it("searches the sanskrit name", () => {
    expect(slugs({ q: "balas" })).toEqual(["child"])
  })

  it("leaves courses without a level out of a level filter", () => {
    expect(slugs({ level: "beginner" })).toEqual(["tree"])
  })

  it("combines the search with the level", () => {
    expect(slugs({ q: "nino", level: "beginner" })).toEqual([])
  })
})

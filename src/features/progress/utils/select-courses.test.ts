import { describe, expect, it } from "vitest"

import { selectCourses } from "./select-courses"

const courses = ["tree", "crow"].map((slug) => ({
  slug,
  name: slug,
  sanskritName: "Asana",
  summary: "",
  durationMinutes: 10,
}))

describe("selectCourses", () => {
  it("follows the saved order and ignores courses that no longer exist", () => {
    const selected = selectCourses(courses, ["crow", "gone", "tree"])

    expect(selected.map((course) => course.slug)).toEqual(["crow", "tree"])
  })
})

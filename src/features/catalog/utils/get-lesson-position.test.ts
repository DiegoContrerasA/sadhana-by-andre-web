import { describe, expect, it } from "vitest"

import { getLessonPosition } from "./get-lesson-position"

const lessons = [
  {
    slug: "the-pose",
    title: "La postura",
    description: "",
    durationMinutes: 3,
  },
  { slug: "foundation", title: "La base", description: "", durationMinutes: 5 },
]

describe("getLessonPosition", () => {
  it("starts on the first lesson when none is requested", () => {
    expect(getLessonPosition(lessons)).toEqual({
      index: 0,
      lesson: lessons[0],
      previous: undefined,
      next: lessons[1],
    })
  })

  it("returns the neighbours of the requested lesson", () => {
    expect(getLessonPosition(lessons, "foundation")).toEqual({
      index: 1,
      lesson: lessons[1],
      previous: lessons[0],
      next: undefined,
    })
  })

  it("returns nothing for an unknown lesson", () => {
    expect(getLessonPosition(lessons, "unknown")).toBeUndefined()
  })
})

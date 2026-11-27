import { describe, expect, it } from "vitest"

import { isLessonLocked } from "./is-lesson-locked"

describe("isLessonLocked", () => {
  it("keeps the first lesson open for everyone", () => {
    expect(isLessonLocked(0, false)).toBe(false)
  })

  it("locks the other lessons until the user has access", () => {
    expect(isLessonLocked(1, false)).toBe(true)
    expect(isLessonLocked(1, true)).toBe(false)
  })
})

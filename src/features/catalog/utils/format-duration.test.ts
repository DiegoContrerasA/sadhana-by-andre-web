import { describe, expect, it } from "vitest"

import { formatDuration } from "./format-duration"

describe("formatDuration", () => {
  it("shows minutes below one hour", () => {
    expect(formatDuration(45)).toBe("45 min")
  })

  it("shows whole hours without minutes", () => {
    expect(formatDuration(120)).toBe("2 h")
  })

  it("shows hours and the remaining minutes", () => {
    expect(formatDuration(65)).toBe("1 h 5 min")
  })
})

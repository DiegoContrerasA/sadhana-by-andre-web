import { describe, expect, it } from "vitest"

import { getInitials } from "./get-initials"

describe("getInitials", () => {
  it("uses the first letter of each name in uppercase", () => {
    expect(getInitials("ángela", "núñez")).toBe("ÁN")
  })
})

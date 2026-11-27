import { describe, expect, it } from "vitest"

import { parseSavedProfile } from "./parse-saved-profile"

const valid = { firstName: "Ana", lastName: "Gómez", phone: "3001234567" }

describe("parseSavedProfile", () => {
  it("reads a saved profile and ignores unknown fields", () => {
    const value = JSON.stringify({ ...valid, email: "otro@correo.com" })

    expect(parseSavedProfile(value)).toEqual(valid)
  })

  it.each([undefined, "", "{", "null", JSON.stringify({ firstName: "A" })])(
    "ignores the invalid value %s",
    (value) => {
      expect(parseSavedProfile(value)).toBeUndefined()
    },
  )
})

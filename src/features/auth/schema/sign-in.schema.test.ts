import { describe, expect, it } from "vitest"

import { signInSchema } from "./sign-in.schema"

function getMessages(input: unknown) {
  const parsed = signInSchema.safeParse(input)

  return parsed.success ? [] : parsed.error.issues.map((issue) => issue.message)
}

describe("signInSchema", () => {
  it("normalizes the email", () => {
    const values = signInSchema.parse({
      email: "  Alumna@Sadhana.TEST ",
      password: "x",
    })

    expect(values.email).toBe("alumna@sadhana.test")
  })

  it("requires both fields", () => {
    expect(getMessages({ email: "", password: "" })).toEqual([
      "emailRequired",
      "passwordRequired",
    ])
  })

  it("rejects a malformed email", () => {
    expect(getMessages({ email: "alumna", password: "x" })).toEqual([
      "emailInvalid",
    ])
  })
})

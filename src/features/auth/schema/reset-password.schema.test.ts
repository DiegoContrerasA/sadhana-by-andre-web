import { describe, expect, it } from "vitest"

import { resetPasswordSchema } from "./reset-password.schema"

function getErrors(password: string, confirmPassword: string) {
  const parsed = resetPasswordSchema.safeParse({ password, confirmPassword })

  return parsed.success ? [] : parsed.error.issues.map((issue) => issue.message)
}

describe("resetPasswordSchema", () => {
  it("accepts a valid matching password", () => {
    expect(getErrors("clave1234", "clave1234")).toEqual([])
  })

  it("applies the shared password rules", () => {
    expect(getErrors("soloLetras", "soloLetras")).toContain("passwordWeak")
  })

  it("rejects passwords that do not match", () => {
    expect(getErrors("clave1234", "clave1235")).toEqual(["mismatch"])
  })
})

import { describe, expect, it } from "vitest"

import { signUpSchema } from "./sign-up.schema"

const valid = {
  firstName: " Ana ",
  lastName: "Gómez",
  email: " Ana@Correo.com ",
  phone: "+57 (300) 123-4567",
  password: "clave1234",
}

function getErrors(overrides: Partial<typeof valid>) {
  const parsed = signUpSchema.safeParse({ ...valid, ...overrides })

  return parsed.success ? [] : parsed.error.issues.map((issue) => issue.message)
}

describe("signUpSchema", () => {
  it("normalizes names, email and phone", () => {
    expect(signUpSchema.parse(valid)).toMatchObject({
      firstName: "Ana",
      email: "ana@correo.com",
      phone: "+573001234567",
    })
  })

  it("requires every field", () => {
    const errors = getErrors({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    })

    expect(errors).toEqual(
      expect.arrayContaining([
        "firstNameRequired",
        "lastNameRequired",
        "emailRequired",
        "phoneRequired",
        "passwordRequired",
      ]),
    )
  })

  it.each(["abc1234567", "123456", "1234567890123456"])(
    "rejects the phone %s",
    (phone) => {
      expect(getErrors({ phone })).toContain("phoneInvalid")
    },
  )

  it.each([
    ["abc12", "passwordMin"],
    ["soloLetras", "passwordWeak"],
    ["12345678", "passwordWeak"],
    [`a1${"x".repeat(127)}`, "passwordMax"],
  ])("rejects a weak or out of range password", (password, message) => {
    expect(getErrors({ password })).toContain(message)
  })
})

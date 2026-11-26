import { describe, expect, it } from "vitest"

import mockReset from "@/lib/auth/mock-reset-token.json"
import mockUsers from "@/lib/auth/mock-users.json"

import { requestPasswordReset } from "./request-password-reset"
import { resetPassword } from "./reset-password"

const values = { password: "clave1234", confirmPassword: "clave1234" }

describe("requestPasswordReset", () => {
  it("answers the same whether the email exists or not", async () => {
    const known = await requestPasswordReset({ email: mockUsers[0]?.email })
    const unknown = await requestPasswordReset({ email: "nadie@correo.com" })

    expect(known).toEqual({ ok: true })
    expect(unknown).toEqual(known)
  })
})

describe("resetPassword", () => {
  it("accepts the mock token", async () => {
    expect(await resetPassword(mockReset.token, values)).toEqual({ ok: true })
  })

  it("rejects an unknown token", async () => {
    expect(await resetPassword("otro", values)).toEqual({
      ok: false,
      error: "invalidToken",
    })
  })
})

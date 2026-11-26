import { describe, expect, it } from "vitest"

import mockUsers from "@/lib/auth/mock-users.json"

import { signUp } from "./sign-up"

const valid = {
  firstName: "Ana",
  lastName: "Gómez",
  email: "ana@correo.com",
  phone: "3001234567",
  password: "clave1234",
}

describe("signUp", () => {
  it("accepts a new user", async () => {
    expect(await signUp(valid)).toEqual({ ok: true })
  })

  it("rejects an email that already exists", async () => {
    const email = mockUsers[0]?.email.toUpperCase()

    expect(await signUp({ ...valid, email })).toEqual({
      ok: false,
      error: "emailTaken",
    })
  })

  it("validates again on the server", async () => {
    expect(await signUp({ ...valid, phone: "x" })).toEqual({
      ok: false,
      error: "invalidInput",
    })
  })
})

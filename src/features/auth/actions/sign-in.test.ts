import { describe, expect, it } from "vitest"

import mockUsers from "@/lib/auth/mock-users.json"

import { signIn } from "./sign-in"

const [user] = mockUsers

describe("signIn", () => {
  it("accepts the seeded user", async () => {
    const result = await signIn({
      email: user?.email,
      password: user?.password,
    })

    expect(result).toEqual({ ok: true })
  })

  it("answers the same for a wrong password and invalid input", async () => {
    const expected = { ok: false, error: "invalidCredentials" }

    expect(await signIn({ email: user?.email, password: "no" })).toEqual(
      expected,
    )
    expect(await signIn(null)).toEqual(expected)
  })
})

import { beforeEach, describe, expect, it, vi } from "vitest"

import { getAccount } from "../data/get-account"
import { updateProfile } from "./update-profile"

const jar = new Map<string, string>()
const set = vi.fn((name: string, value: string) => jar.set(name, value))

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({
    get: (name: string) => {
      const value = jar.get(name)
      return value === undefined ? undefined : { name, value }
    },
    set,
  })),
}))

const values = { firstName: " Ana ", lastName: "Gómez", phone: "300 123 4567" }

describe("updateProfile", () => {
  beforeEach(() => {
    jar.clear()
    set.mockClear()
  })

  it("saves the cleaned values and keeps the account email", async () => {
    const before = await getAccount()

    await expect(updateProfile(values)).resolves.toEqual({ ok: true })

    await expect(getAccount()).resolves.toEqual({
      firstName: "Ana",
      lastName: "Gómez",
      phone: "3001234567",
      email: before.email,
    })
    expect(set).toHaveBeenCalledWith(
      "sadhana_profile",
      expect.not.stringContaining("@"),
      expect.objectContaining({ httpOnly: true }),
    )
  })

  it("rejects invalid values without saving", async () => {
    await expect(updateProfile({ ...values, phone: "x" })).resolves.toEqual({
      ok: false,
      error: "invalidInput",
    })
    expect(set).not.toHaveBeenCalled()
  })
})

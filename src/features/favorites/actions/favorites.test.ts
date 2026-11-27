import { beforeEach, describe, expect, it, vi } from "vitest"

import { getFavoriteSlugs } from "../data/get-favorite-slugs"
import { addFavorite } from "./add-favorite"
import { removeFavorite } from "./remove-favorite"

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

describe("favorite actions", () => {
  beforeEach(() => {
    jar.clear()
    set.mockClear()
  })

  it("saves the newest favorite first and removes only the requested one", async () => {
    await addFavorite("tree")
    await addFavorite("crow")
    await addFavorite("cobra")

    await removeFavorite("crow")

    await expect(getFavoriteSlugs()).resolves.toEqual(["cobra", "tree"])
    expect(set).toHaveBeenLastCalledWith(
      "sadhana_favorites",
      "cobra,tree",
      expect.objectContaining({ httpOnly: true, sameSite: "lax" }),
    )
  })

  it.each([addFavorite, removeFavorite])(
    "rejects an invalid value without saving",
    async (action) => {
      await expect(action("<script>")).resolves.toEqual({
        ok: false,
        error: "invalidInput",
      })
      expect(set).not.toHaveBeenCalled()
    },
  )
})

import { notFound } from "next/navigation"
import { describe, expect, it, vi } from "vitest"

import { getCourse } from "./get-course"

vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }))
vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NOT_FOUND")
  }),
}))

describe("getCourse", () => {
  it("returns the course with that slug", async () => {
    await expect(getCourse("es", "tree")).resolves.toMatchObject({
      name: "Árbol",
    })
  })

  it("answers not found for an unknown slug", async () => {
    await expect(getCourse("es", "unknown")).rejects.toThrow("NOT_FOUND")
    expect(notFound).toHaveBeenCalled()
  })
})

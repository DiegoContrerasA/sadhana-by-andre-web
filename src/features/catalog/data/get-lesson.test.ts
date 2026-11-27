import { describe, expect, it, vi } from "vitest"

import { getLesson } from "./get-lesson"
import { getLessonParams } from "./get-lesson-params"

vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }))
vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NOT_FOUND")
  }),
}))

describe("getLesson", () => {
  it("opens the pose explanation by default", async () => {
    await expect(getLesson("es", "tree")).resolves.toMatchObject({
      index: 0,
      lesson: { slug: "the-pose", title: "La postura" },
    })
  })

  it("returns the requested lesson in the requested language", async () => {
    await expect(getLesson("en", "tree", "alignment")).resolves.toMatchObject({
      lesson: { title: "Alignment" },
    })
  })

  it.each(["unknown", "the-pose"])(
    "answers not found for the address %s",
    async (lessonSlug) => {
      await expect(getLesson("es", "tree", lessonSlug)).rejects.toThrow(
        "NOT_FOUND",
      )
    },
  )
})

describe("getLessonParams", () => {
  it("lists every lesson except the first of each course", async () => {
    const params = await getLessonParams("es")

    expect(params).toContainEqual({ slug: "tree", lesson: "foundation" })
    expect(params.map(({ lesson }) => lesson)).not.toContain("the-pose")
  })
})

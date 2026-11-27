import { beforeEach, describe, expect, it, vi } from "vitest"

import { getEnrolledCourses } from "../data/get-enrolled-courses"
import { enrollCourse } from "./enroll-course"
import { unenrollCourse } from "./unenroll-course"

const jar = new Map<string, string>()
const set = vi.fn((name: string, value: string) => jar.set(name, value))

vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }))
vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => ({
    get: (name: string) => {
      const value = jar.get(name)
      return value === undefined ? undefined : { name, value }
    },
    set,
  })),
}))

async function savedSlugs() {
  return (await getEnrolledCourses("es")).map((course) => course.slug)
}

describe("course enrollment", () => {
  beforeEach(() => {
    jar.clear()
    set.mockClear()
  })

  it("lists the newest course first without repeating it", async () => {
    await enrollCourse("tree")
    await enrollCourse("crow")
    await enrollCourse("tree")

    expect(await savedSlugs()).toEqual(["tree", "crow"])
  })

  it("saves a cookie that scripts cannot read", async () => {
    await expect(enrollCourse("tree")).resolves.toEqual({ ok: true })

    expect(set).toHaveBeenCalledWith(
      "sadhana_my_courses",
      "tree",
      expect.objectContaining({ httpOnly: true, sameSite: "lax", path: "/" }),
    )
  })

  it.each(["unknown", "", 42])(
    "rejects %s without saving anything",
    async (input) => {
      await expect(enrollCourse(input)).resolves.toEqual({
        ok: false,
        error: "unknownCourse",
      })
      expect(set).not.toHaveBeenCalled()
    },
  )

  it("removes only the requested course", async () => {
    await enrollCourse("tree")
    await enrollCourse("crow")

    await unenrollCourse("tree")

    expect(await savedSlugs()).toEqual(["crow"])
  })
})

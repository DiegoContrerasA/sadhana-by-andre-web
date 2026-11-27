import { cacheLife, cacheTag } from "next/cache"
import { describe, expect, it, vi } from "vitest"

import mockCourses from "@/lib/catalog/mock-courses.json"

import { getCourses } from "./get-courses"

vi.mock("next/cache", () => ({ cacheLife: vi.fn(), cacheTag: vi.fn() }))

describe("getCourses", () => {
  it("returns every course in the requested language", async () => {
    const courses = await getCourses("en")

    expect(courses).toHaveLength(mockCourses.length)
    expect(courses[0]).toMatchObject({ slug: "tree", name: "Tree" })
  })

  it("registers the catalog tags and cache life", async () => {
    await getCourses("es")

    expect(cacheTag).toHaveBeenCalledWith("catalog", "catalog:courses")
    expect(cacheLife).toHaveBeenCalledWith("days")
  })

  it("keeps slugs unique", async () => {
    const slugs = (await getCourses("es")).map((course) => course.slug)

    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

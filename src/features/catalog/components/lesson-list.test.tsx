import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { LessonList } from "./lesson-list"

const lessons = [
  {
    slug: "the-pose",
    title: "La postura",
    description: "",
    durationMinutes: 3,
  },
  { slug: "foundation", title: "La base", description: "", durationMinutes: 5 },
]

describe("LessonList", () => {
  it("links each lesson and marks the current one", () => {
    render(
      <LessonList
        title="Contenido"
        summaryLabel="2 clases · 8 min"
        courseHref="/courses/tree"
        lessons={lessons}
        currentSlug="foundation"
      />,
    )

    const first = screen.getByRole("link", { name: /La postura/ })
    const second = screen.getByRole("link", { name: /La base/ })

    expect(first).toHaveAttribute("href", "/courses/tree")
    expect(first).not.toHaveAttribute("aria-current")
    expect(second).toHaveAttribute("href", "/courses/tree/foundation")
    expect(second).toHaveAttribute("aria-current", "page")
    expect(
      screen.getByRole("complementary", { name: "Contenido" }),
    ).toHaveTextContent("2 clases · 8 min")
  })
})

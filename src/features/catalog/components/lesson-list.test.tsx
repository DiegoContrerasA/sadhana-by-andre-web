import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import messages from "../../../../messages/es.json"
import { LessonList } from "./lesson-list"

const lessons = [
  {
    slug: "the-pose",
    title: "La postura",
    description: "Qué es la postura.",
    durationMinutes: 3,
  },
  {
    slug: "foundation",
    title: "La base",
    description: "Los apoyos.",
    durationMinutes: 5,
  },
]

function renderList(hasAccess: boolean, currentSlug = "the-pose") {
  render(
    <LessonList
      copy={messages.catalog.lesson}
      summaryLabel="2 clases · 8 min"
      courseHref="/courses/tree"
      lessons={lessons}
      currentSlug={currentSlug}
      hasAccess={hasAccess}
    />,
  )

  return {
    first: screen.getByRole("link", { name: /La postura/ }),
    second: screen.getByRole("link", { name: /La base/ }),
  }
}

describe("LessonList", () => {
  it("links each lesson and marks the current one", () => {
    const { first, second } = renderList(true, "foundation")

    expect(first).toHaveAttribute("href", "/courses/tree")
    expect(first).not.toHaveAttribute("aria-current")
    expect(second).toHaveAttribute("href", "/courses/tree/foundation")
    expect(second).toHaveAttribute("aria-current", "page")
    expect(
      screen.getByRole("complementary", { name: "Contenido" }),
    ).toHaveTextContent("2 clases · 8 min")
  })

  it("previews every lesson and locks all but the first without access", () => {
    const { first, second } = renderList(false)

    expect(first).toHaveTextContent("Gratis")
    expect(first).toHaveTextContent("Qué es la postura.")
    expect(first).not.toHaveTextContent("Requiere inscripción")
    expect(second).toHaveTextContent("Los apoyos.")
    expect(second).toHaveTextContent("Requiere inscripción")
  })

  it("shows only titles and no locks with access", () => {
    const { first, second } = renderList(true)

    expect(first).not.toHaveTextContent("Gratis")
    expect(second).not.toHaveTextContent("Los apoyos.")
    expect(second).not.toHaveTextContent("Requiere inscripción")
  })
})

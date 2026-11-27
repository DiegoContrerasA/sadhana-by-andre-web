import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { CourseCard } from "./course-card"

const copy = { duration: "Duración", open: "Ir al curso" }

const course = {
  slug: "tree",
  name: "Árbol",
  sanskritName: "Vrksasana",
  summary: "Encuentra el equilibrio.",
  durationMinutes: 14,
}

describe("CourseCard", () => {
  it("shows the pose names, summary, level and duration", () => {
    render(
      <CourseCard
        copy={copy}
        course={course}
        href="/courses/tree"
        levelLabel="Principiante"
      />,
    )

    expect(screen.getByRole("heading", { name: "Árbol" })).toBeInTheDocument()
    expect(screen.getByText("Vrksasana")).toHaveAttribute("lang", "sa-Latn")
    expect(screen.getByText("Encuentra el equilibrio.")).toBeInTheDocument()
    expect(screen.getByText("Principiante")).toBeInTheDocument()
    expect(screen.getByText("14 min")).toHaveTextContent("Duración: 14 min")
  })

  it("is a single link to the course, named after it", () => {
    render(<CourseCard copy={copy} course={course} href="/courses/tree" />)

    expect(screen.getAllByRole("link")).toHaveLength(1)
    expect(screen.getByRole("link", { name: "Árbol" })).toHaveAttribute(
      "href",
      "/courses/tree",
    )
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })
})

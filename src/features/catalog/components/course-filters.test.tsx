import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import es from "../../../../messages/es.json"
import { CourseFilters } from "./course-filters"

const copy = es.catalog

function renderFilters(
  filters: Parameters<typeof CourseFilters>[0]["filters"],
) {
  return render(
    <CourseFilters copy={copy} basePath="/courses" filters={filters} />,
  )
}

function getGroup(name: string) {
  return within(screen.getByRole("navigation", { name }))
}

describe("CourseFilters", () => {
  it("selects the options for all by default and hides clear", () => {
    renderFilters({})

    expect(screen.getByRole("link", { name: copy.levels.all })).toHaveAttribute(
      "aria-current",
      "true",
    )
    expect(screen.queryByRole("link", { name: copy.clear })).toBeNull()
  })

  it("keeps the search when changing the level", () => {
    renderFilters({ q: "cadera", level: "advanced" })
    const levels = getGroup(copy.levels.label)

    expect(
      levels.getByRole("link", { name: copy.levels.beginner }),
    ).toHaveAttribute("href", "/courses?q=cadera&level=beginner")
    expect(levels.getByRole("link", { name: copy.levels.all })).toHaveAttribute(
      "href",
      "/courses?q=cadera",
    )
  })

  it("sends the active filters along with the search", () => {
    const { container } = renderFilters({ level: "advanced" })

    expect(
      container.querySelector('input[type="hidden"][name="level"]'),
    ).toHaveValue("advanced")
    expect(
      screen.getByRole("searchbox", { name: copy.search.label }),
    ).toHaveAttribute("name", "q")
  })

  it("offers to clear when a filter is active", () => {
    renderFilters({ level: "beginner" })

    expect(screen.getByRole("link", { name: copy.clear })).toHaveAttribute(
      "href",
      "/courses",
    )
  })
})

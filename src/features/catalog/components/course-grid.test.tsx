import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import messages from "../../../../messages/es.json"
import { CourseGrid } from "./course-grid"

const observers: IntersectionObserverCallback[] = []

class FakeIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    observers.push(callback)
  }
  observe() {}
  disconnect() {}
}

function reachEndOfList() {
  const entry = { isIntersecting: true }
  act(() => {
    Reflect.apply(observers.at(-1) ?? vi.fn(), undefined, [[entry]])
  })
}

function renderGrid(total: number) {
  const courses = Array.from({ length: total }, (_, index) => ({
    slug: `course-${index}`,
    name: `Course ${index}`,
    sanskritName: "Asana",
    summary: "Summary",
    durationMinutes: 10,
  }))
  render(
    <CourseGrid
      copy={messages.catalog}
      basePath="/courses"
      courses={courses}
    />,
  )
}

describe("CourseGrid", () => {
  beforeEach(() => {
    observers.length = 0
    vi.stubGlobal("IntersectionObserver", FakeIntersectionObserver)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("shows the first nine courses", () => {
    renderGrid(27)

    expect(screen.getAllByRole("listitem")).toHaveLength(9)
  })

  it("reveals more courses when the end of the list gets close", () => {
    renderGrid(27)

    reachEndOfList()
    expect(screen.getAllByRole("listitem")).toHaveLength(18)

    reachEndOfList()
    expect(screen.getAllByRole("listitem")).toHaveLength(27)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("also reveals more courses from the button", async () => {
    renderGrid(27)

    await userEvent.click(
      screen.getByRole("button", { name: "Ver más posturas" }),
    )

    expect(screen.getAllByRole("listitem")).toHaveLength(18)
  })

  it("has no button when every course fits in the first page", () => {
    renderGrid(9)

    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })
})

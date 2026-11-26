import { act, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { NavBar } from "./nav-bar"

function scrollTo(position: number) {
  vi.spyOn(window, "scrollY", "get").mockReturnValue(position)
  act(() => {
    window.dispatchEvent(new Event("scroll"))
  })
}

describe("NavBar", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("turns solid only after scrolling past 100 pixels", () => {
    render(<NavBar>menu</NavBar>)
    const bar = screen.getByText("menu")

    scrollTo(100)
    expect(bar).toHaveAttribute("data-scrolled", "false")

    scrollTo(101)
    expect(bar).toHaveAttribute("data-scrolled", "true")

    scrollTo(0)
    expect(bar).toHaveAttribute("data-scrolled", "false")
  })
})

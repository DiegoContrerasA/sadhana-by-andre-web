import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import HomePage from "./page"

describe("HomePage", () => {
  it("renders only the main action button", () => {
    render(<HomePage />)

    expect(screen.getAllByRole("button")).toHaveLength(1)
    expect(screen.getByRole("button", { name: "Empezar" })).toBeInTheDocument()
  })
})

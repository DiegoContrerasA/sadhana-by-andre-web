import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { HeroBrand } from "./hero-brand"

vi.mock("../assets/logo.png", () => ({
  default: { src: "/logo.png", width: 1220, height: 204 },
}))

describe("HeroBrand", () => {
  it("uses the visible headline as the only main heading", () => {
    render(
      <HeroBrand
        logoAlt="Logo"
        byline="by andre"
        headline="Yoga en Envigado con Andre"
      />,
    )

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Yoga en Envigado con Andre",
    )
    expect(screen.getByRole("img", { name: "Logo" })).toBeInTheDocument()
  })
})

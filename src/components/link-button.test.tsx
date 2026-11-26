import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { LinkButton } from "./link-button"

describe("LinkButton", () => {
  it("keeps link semantics for internal destinations", () => {
    render(<LinkButton href="/en">English</LinkButton>)

    const link = screen.getByRole("link", { name: "English" })

    expect(link).toHaveAttribute("href", "/en")
    expect(link).not.toHaveAttribute("target")
  })

  it("opens external destinations safely in a new tab", () => {
    render(
      <LinkButton href="https://example.com" isExternal>
        Reservar
      </LinkButton>,
    )

    const link = screen.getByRole("link", { name: "Reservar" })

    expect(link).toHaveAttribute("target", "_blank")
    expect(link).toHaveAttribute("rel", "noopener noreferrer")
  })
})

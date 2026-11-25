import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { SubmitButton } from "./submit-button"

describe("SubmitButton", () => {
  it("renders an enabled submit button with its label", () => {
    render(
      <SubmitButton isPending={false} pendingLabel="Enviando…">
        Enviar
      </SubmitButton>,
    )
    const button = screen.getByRole("button", { name: "Enviar" })

    expect(button).toHaveAttribute("type", "submit")
    expect(button).toBeEnabled()
  })

  it("is disabled and busy with the pending label while pending", () => {
    render(
      <SubmitButton isPending pendingLabel="Enviando…">
        Enviar
      </SubmitButton>,
    )
    const button = screen.getByRole("button", { name: "Enviando…" })

    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-busy", "true")
  })
})

import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { FormError } from "./form-error"

describe("FormError", () => {
  it("announces the message as an alert", () => {
    render(<FormError message="Correo o contraseña incorrectos" />)

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Correo o contraseña incorrectos",
    )
  })

  it("renders nothing without a message", () => {
    render(<FormError />)

    expect(screen.queryByRole("alert")).not.toBeInTheDocument()
  })
})

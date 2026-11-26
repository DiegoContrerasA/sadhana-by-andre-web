import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { renderWithForm } from "@/test/render-with-form"

import { PasswordField } from "./password-field"

type Values = { password: string }

function renderPasswordField(errors?: {
  password: { type: string; message: string }
}) {
  renderWithForm<Values>({
    defaultValues: { password: "" },
    errors,
    children: (control) => (
      <PasswordField
        control={control}
        name="password"
        label="Contraseña"
        autoComplete="current-password"
      />
    ),
  })
}

describe("PasswordField", () => {
  it("keeps the keyboard from altering a revealed password", () => {
    renderPasswordField()
    const input = screen.getByLabelText("Contraseña")

    expect(input).toHaveAttribute("autocapitalize", "none")
    expect(input).toHaveAttribute("autocorrect", "off")
    expect(input).toHaveAttribute("spellcheck", "false")
  })

  it("associates the label with a hidden password input", () => {
    renderPasswordField()

    expect(screen.getByLabelText("Contraseña")).toHaveAttribute(
      "type",
      "password",
    )
  })

  it("toggles the password visibility", async () => {
    renderPasswordField()

    await userEvent.click(
      screen.getByRole("button", { name: "Mostrar contraseña" }),
    )

    expect(screen.getByLabelText("Contraseña")).toHaveAttribute("type", "text")
    expect(
      screen.getByRole("button", { name: "Ocultar contraseña" }),
    ).toHaveAttribute("aria-pressed", "true")
  })

  it("shows the error and marks the input as invalid", () => {
    renderPasswordField({
      password: { type: "custom", message: "Ingresa tu contraseña" },
    })

    expect(screen.getByRole("alert")).toHaveTextContent("Ingresa tu contraseña")
    expect(screen.getByLabelText("Contraseña")).toHaveAttribute(
      "aria-invalid",
      "true",
    )
  })
})

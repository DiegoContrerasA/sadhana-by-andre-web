import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { renderWithForm } from "@/test/render-with-form"

import { CheckboxField } from "./checkbox-field"

type Values = { remember: boolean }

function renderCheckboxField(errors?: {
  remember: { type: string; message: string }
}) {
  renderWithForm<Values>({
    defaultValues: { remember: false },
    errors,
    children: (control) => (
      <CheckboxField control={control} name="remember" label="Recordarme" />
    ),
  })
}

describe("CheckboxField", () => {
  it("starts unchecked and toggles from the label", async () => {
    renderCheckboxField()
    const checkbox = screen.getByRole("checkbox", { name: "Recordarme" })

    expect(checkbox).not.toBeChecked()

    await userEvent.click(screen.getByText("Recordarme"))

    expect(checkbox).toBeChecked()
  })

  it("shows the error message", () => {
    renderCheckboxField({
      remember: { type: "custom", message: "Campo requerido" },
    })

    expect(screen.getByRole("alert")).toHaveTextContent("Campo requerido")
  })
})

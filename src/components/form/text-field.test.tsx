import { zodResolver } from "@hookform/resolvers/zod"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useForm } from "react-hook-form"
import { describe, expect, it, vi } from "vitest"
import { z } from "zod"

import { TextField } from "./text-field"

const emailSchema = z.object({
  email: z.email("Ingresa un correo válido"),
})

type EmailValues = z.infer<typeof emailSchema>

type EmailFormProps = {
  onSubmit: (values: EmailValues) => void
}

function EmailForm({ onSubmit }: EmailFormProps) {
  const { control, handleSubmit } = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  })

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField control={control} name="email" label="Correo" type="email" />
      <button type="submit">Enviar</button>
    </form>
  )
}

describe("TextField", () => {
  it("associates the label with the input", () => {
    render(<EmailForm onSubmit={vi.fn()} />)

    expect(screen.getByLabelText("Correo")).toHaveAttribute("type", "email")
  })

  it("shows the schema error and does not submit when invalid", async () => {
    const onSubmit = vi.fn()
    render(<EmailForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText("Correo"), "no-es-correo")
    await userEvent.click(screen.getByRole("button", { name: "Enviar" }))

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Ingresa un correo válido",
    )
    expect(screen.getByLabelText("Correo")).toHaveAttribute(
      "aria-invalid",
      "true",
    )
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it("submits the typed value when valid", async () => {
    const onSubmit = vi.fn()
    render(<EmailForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByLabelText("Correo"), "andre@example.com")
    await userEvent.click(screen.getByRole("button", { name: "Enviar" }))

    expect(onSubmit).toHaveBeenCalledWith(
      { email: "andre@example.com" },
      expect.anything(),
    )
  })
})

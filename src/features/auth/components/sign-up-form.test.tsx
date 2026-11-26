import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { NextIntlClientProvider } from "next-intl"
import { beforeEach, describe, expect, it, vi } from "vitest"

import es from "../../../../messages/es.json"
import { signUp } from "../actions/sign-up"
import { SignUpForm } from "./sign-up-form"

vi.mock("../actions/sign-up", () => ({ signUp: vi.fn() }))
vi.mock("../actions/sign-in-with-google", () => ({
  signInWithGoogle: vi.fn(),
}))

const copy = es.auth.signUp

function renderForm() {
  render(
    <NextIntlClientProvider locale="es" messages={{ auth: es.auth }}>
      <SignUpForm signInHref="/sign-in" />
    </NextIntlClientProvider>,
  )
}

async function fillAndSubmit() {
  const values = [
    [copy.firstName, "Ana"],
    [copy.lastName, "Gómez"],
    [copy.email, "ana@correo.com"],
    [copy.phone, "300 123 4567"],
    [copy.password, "clave1234"],
  ] as const
  for (const [label, value] of values) {
    await userEvent.type(screen.getByLabelText(label), value)
  }
  await userEvent.click(screen.getByRole("button", { name: copy.submit }))
}

describe("SignUpForm", () => {
  beforeEach(() => {
    vi.mocked(signUp).mockReset()
  })

  it("shows the validation errors and does not submit", async () => {
    renderForm()

    await userEvent.click(screen.getByRole("button", { name: copy.submit }))

    expect(screen.getByText(copy.errors.firstNameRequired)).toBeInTheDocument()
    expect(screen.getByText(copy.errors.phoneRequired)).toBeInTheDocument()
    expect(signUp).not.toHaveBeenCalled()
  })

  it("sends the normalized values and confirms the mock sign up", async () => {
    vi.mocked(signUp).mockResolvedValue({ ok: true })
    renderForm()

    await fillAndSubmit()

    expect(await screen.findByRole("status")).toHaveTextContent(copy.success)
    expect(signUp).toHaveBeenCalledWith(
      expect.objectContaining({ phone: "3001234567" }),
    )
  })

  it("shows a taken email on its field and keeps the values", async () => {
    vi.mocked(signUp).mockResolvedValue({ ok: false, error: "emailTaken" })
    renderForm()

    await fillAndSubmit()

    expect(await screen.findByText(copy.errors.emailTaken)).toBeInTheDocument()
    expect(screen.getByLabelText(copy.email)).toHaveAttribute(
      "aria-invalid",
      "true",
    )
    expect(screen.getByLabelText(copy.firstName)).toHaveValue("Ana")
  })

  it("links back to sign in", () => {
    renderForm()

    expect(screen.getByRole("link", { name: copy.signIn })).toHaveAttribute(
      "href",
      "/sign-in",
    )
  })

  it("does not mark a new email as taken when it changed meanwhile", async () => {
    const response = Promise.withResolvers<Awaited<ReturnType<typeof signUp>>>()
    vi.mocked(signUp).mockReturnValue(response.promise)
    renderForm()
    await fillAndSubmit()

    await userEvent.type(screen.getByLabelText(copy.email), ".co")
    await act(async () => response.resolve({ ok: false, error: "emailTaken" }))

    expect(screen.queryByText(copy.errors.emailTaken)).toBeNull()
  })
})

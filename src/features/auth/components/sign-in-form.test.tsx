import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { NextIntlClientProvider } from "next-intl"
import { beforeEach, describe, expect, it, vi } from "vitest"

import es from "../../../../messages/es.json"
import { signIn } from "../actions/sign-in"
import { signInWithGoogle } from "../actions/sign-in-with-google"
import { SignInForm } from "./sign-in-form"

vi.mock("../actions/sign-in", () => ({ signIn: vi.fn() }))
vi.mock("../actions/sign-in-with-google", () => ({
  signInWithGoogle: vi.fn(),
}))

const copy = es.auth.signIn

function renderForm() {
  render(
    <NextIntlClientProvider locale="es" messages={{ auth: es.auth }}>
      <SignInForm signUpHref="/sign-up" forgotPasswordHref="/forgot-password" />
    </NextIntlClientProvider>,
  )
}

async function fillAndSubmit(email: string, password: string) {
  await userEvent.type(screen.getByLabelText(copy.email), email)
  await userEvent.type(screen.getByLabelText(copy.password), password)
  await userEvent.click(screen.getByRole("button", { name: copy.submit }))
}

describe("SignInForm", () => {
  beforeEach(() => {
    vi.mocked(signIn).mockReset()
    vi.mocked(signInWithGoogle).mockReset()
  })

  it("asks the browser not to fill in saved credentials", () => {
    renderForm()

    expect(screen.getByLabelText(copy.email)).toHaveAttribute(
      "autocomplete",
      "off",
    )
    expect(screen.getByLabelText(copy.password)).toHaveAttribute(
      "autocomplete",
      "new-password",
    )
  })

  it("links to account creation and password recovery", () => {
    renderForm()

    expect(
      screen.getByRole("link", { name: copy.createAccount }),
    ).toHaveAttribute("href", "/sign-up")
    expect(
      screen.getByRole("link", { name: copy.forgotPassword }),
    ).toHaveAttribute("href", "/forgot-password")
  })

  it("shows the validation errors and does not submit", async () => {
    renderForm()

    await userEvent.click(screen.getByRole("button", { name: copy.submit }))

    expect(screen.getByText(copy.errors.emailRequired)).toBeInTheDocument()
    expect(screen.getByText(copy.errors.passwordRequired)).toBeInTheDocument()
    expect(signIn).not.toHaveBeenCalled()
  })

  it("keeps the values and shows the server error", async () => {
    vi.mocked(signIn).mockResolvedValue({
      ok: false,
      error: "invalidCredentials",
    })
    renderForm()

    await fillAndSubmit("ana@correo.com", "clave")

    expect(
      await screen.findByText(copy.errors.invalidCredentials),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(copy.email)).toHaveValue("ana@correo.com")
  })

  it("shows a generic error when the request throws", async () => {
    vi.mocked(signIn).mockRejectedValue(new Error("offline"))
    renderForm()

    await fillAndSubmit("ana@correo.com", "clave")

    expect(await screen.findByText(copy.errors.unknown)).toBeInTheDocument()
  })

  it("runs the google mock without validating the form", async () => {
    vi.mocked(signInWithGoogle).mockResolvedValue({ ok: true })
    renderForm()

    await userEvent.click(screen.getByRole("button", { name: copy.google }))

    expect(await screen.findByRole("status")).toHaveTextContent(copy.success)
    expect(screen.queryByText(copy.errors.emailRequired)).toBeNull()
  })

  it("clears the field errors when continuing with google", async () => {
    vi.mocked(signInWithGoogle).mockResolvedValue({ ok: true })
    renderForm()

    await userEvent.click(screen.getByRole("button", { name: copy.submit }))
    await userEvent.click(screen.getByRole("button", { name: copy.google }))

    expect(await screen.findByRole("status")).toBeInTheDocument()
    expect(screen.queryByText(copy.errors.emailRequired)).toBeNull()
  })
})

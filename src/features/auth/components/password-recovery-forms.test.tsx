import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { NextIntlClientProvider } from "next-intl"
import type { ReactNode } from "react"
import { renderToString } from "react-dom/server"
import { beforeEach, describe, expect, it, vi } from "vitest"

import es from "../../../../messages/es.json"
import { requestPasswordReset } from "../actions/request-password-reset"
import { resetPassword } from "../actions/reset-password"
import { ForgotPasswordForm } from "./forgot-password-form"
import { ResetPasswordForm } from "./reset-password-form"

vi.mock("../actions/request-password-reset", () => ({
  requestPasswordReset: vi.fn(),
}))
vi.mock("../actions/reset-password", () => ({ resetPassword: vi.fn() }))
vi.mock("../actions/sign-in-with-google", () => ({
  signInWithGoogle: vi.fn(),
}))

function withIntl(children: ReactNode) {
  return (
    <NextIntlClientProvider locale="es" messages={{ auth: es.auth }}>
      {children}
    </NextIntlClientProvider>
  )
}

const forgot = es.auth.forgotPassword
const reset = es.auth.resetPassword
const forgotForm = (
  <ForgotPasswordForm signInHref="/sign-in" mockResetHref="/reset-password" />
)

describe("password recovery forms", () => {
  beforeEach(() => {
    vi.mocked(requestPasswordReset).mockReset()
    vi.mocked(resetPassword).mockReset()
  })

  it("cannot send data natively before the page is ready", () => {
    const html = renderToString(withIntl(forgotForm))

    expect(html).toContain('method="post"')
    expect(html).toMatch(
      /<button[^>]*disabled=""[^>]*type="submit"|<button[^>]*type="submit"[^>]*disabled=""/,
    )
  })

  it("confirms the request and offers the test link", async () => {
    vi.mocked(requestPasswordReset).mockResolvedValue({ ok: true })
    render(withIntl(forgotForm))

    await userEvent.type(screen.getByLabelText(forgot.email), "a@correo.com")
    await userEvent.click(screen.getByRole("button", { name: forgot.submit }))

    expect(await screen.findByRole("status")).toHaveTextContent(forgot.success)
    expect(screen.getByRole("link", { name: forgot.mockLink })).toHaveAttribute(
      "href",
      "/reset-password",
    )
  })

  it("sends the token with the new password", async () => {
    vi.mocked(resetPassword).mockResolvedValue({ ok: true })
    render(withIntl(<ResetPasswordForm token="abc" signInHref="/sign-in" />))

    await userEvent.type(screen.getByLabelText(reset.password), "clave1234")
    await userEvent.type(
      screen.getByLabelText(reset.confirmPassword),
      "clave1234",
    )
    await userEvent.click(screen.getByRole("button", { name: reset.submit }))

    expect(await screen.findByRole("status")).toHaveTextContent(reset.success)
    expect(resetPassword).toHaveBeenCalledWith("abc", expect.anything())
  })
})

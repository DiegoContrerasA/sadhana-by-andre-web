import { render, screen } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import { describe, expect, it } from "vitest"

import es from "../../../../messages/es.json"
import { ResetLinkLoading } from "./reset-link-loading"

describe("ResetLinkLoading", () => {
  it("explains that the link is being validated", () => {
    render(
      <NextIntlClientProvider locale="es" messages={{ auth: es.auth }}>
        <ResetLinkLoading />
      </NextIntlClientProvider>,
    )

    expect(screen.getByRole("status")).toHaveTextContent(
      es.auth.resetPassword.validating,
    )
  })
})

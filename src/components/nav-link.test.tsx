import { render, screen } from "@testing-library/react"
import { NextIntlClientProvider } from "next-intl"
import { describe, expect, it, vi } from "vitest"

import { NavLink } from "./nav-link"

const pathname = vi.hoisted(() => ({ current: "/courses" }))

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  usePathname: () => pathname.current,
}))

function renderLink(current: string, locale: "es" | "en" = "es") {
  pathname.current = current
  render(
    <NextIntlClientProvider locale={locale} messages={{}}>
      <NavLink href="/courses">Cursos</NavLink>
    </NextIntlClientProvider>,
  )

  return screen.getByRole("link", { name: "Cursos" })
}

describe("NavLink", () => {
  it.each(["/courses", "/courses/yoga-facial"])("is current on %s", (path) => {
    expect(renderLink(path)).toHaveAttribute("aria-current", "page")
  })

  it.each(["/favorites", "/courses-archive"])(
    "is not current on %s",
    (path) => {
      expect(renderLink(path)).not.toHaveAttribute("aria-current")
    },
  )

  it("matches and links with the language prefix", () => {
    const link = renderLink("/en/courses", "en")

    expect(link).toHaveAttribute("aria-current", "page")
    expect(link).toHaveAttribute("href", "/en/courses")
  })
})

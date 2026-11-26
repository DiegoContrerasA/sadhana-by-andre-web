import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { LanguageSwitcher } from "./language-switcher"

describe("LanguageSwitcher", () => {
  it("links both languages and marks the current one", () => {
    render(
      <LanguageSwitcher
        label="Language"
        currentLocale="en"
        hrefs={{ es: "/", en: "/en" }}
      />,
    )

    const spanish = screen.getByRole("link", { name: "es" })
    const english = screen.getByRole("link", { name: "en" })

    expect(spanish).toHaveAttribute("href", "/")
    expect(spanish).not.toHaveAttribute("aria-current")
    expect(english).toHaveAttribute("aria-current", "true")
  })
})

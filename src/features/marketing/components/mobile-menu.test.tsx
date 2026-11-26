import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import es from "../../../../messages/es.json"
import { MobileMenu } from "./mobile-menu"

describe("MobileMenu", () => {
  it("closes after choosing a section", async () => {
    render(<MobileMenu nav={es.nav}>idiomas</MobileMenu>)

    await userEvent.click(screen.getByRole("button", { name: es.nav.openMenu }))
    await userEvent.click(screen.getByRole("link", { name: "Horarios" }))

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    )
  })
})

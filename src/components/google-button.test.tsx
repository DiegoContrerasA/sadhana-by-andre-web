import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { GoogleButton } from "./google-button"

describe("GoogleButton", () => {
  it("runs the action when pressed", async () => {
    const onClick = vi.fn()
    render(
      <GoogleButton isPending={false} pendingLabel="Loading" onClick={onClick}>
        Google
      </GoogleButton>,
    )

    await userEvent.click(screen.getByRole("button", { name: "Google" }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it("is disabled and shows the pending label while loading", () => {
    render(
      <GoogleButton isPending pendingLabel="Loading">
        Google
      </GoogleButton>,
    )

    expect(screen.getByRole("button", { name: "Loading" })).toBeDisabled()
  })
})

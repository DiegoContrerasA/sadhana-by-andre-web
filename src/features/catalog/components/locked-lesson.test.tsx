import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { LockedLesson } from "./locked-lesson"

describe("LockedLesson", () => {
  it("explains the lock, offers the action and has no video", () => {
    const { container } = render(
      <LockedLesson title="Inscríbete para ver esta clase">
        <button type="button">Inscribirme</button>
      </LockedLesson>,
    )

    expect(
      screen.getByText("Inscríbete para ver esta clase"),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Inscribirme" }),
    ).toBeInTheDocument()
    expect(container.querySelector("video")).toBeNull()
  })
})

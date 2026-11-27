import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { CourseOverview } from "./course-overview"

const overview = {
  paragraphs: ["Primer párrafo.", "Segundo párrafo."],
  sections: [{ title: "Antes de empezar", items: ["Un mat.", "Dos bloques."] }],
}

describe("CourseOverview", () => {
  it("shows the paragraphs and each section with its list", () => {
    render(<CourseOverview title="Sobre la postura" overview={overview} />)

    expect(
      screen.getByRole("region", { name: "Sobre la postura" }),
    ).toHaveTextContent("Segundo párrafo.")
    expect(
      screen.getByRole("heading", { level: 3, name: "Antes de empezar" }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole("listitem")).toHaveLength(2)
  })
})

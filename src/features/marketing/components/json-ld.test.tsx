import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { JsonLd } from "./json-ld"

describe("JsonLd", () => {
  it("escapes markup so the script cannot be closed early", () => {
    const { container } = render(<JsonLd schema={{ name: "</script>" }} />)

    expect(container.querySelector("script")?.innerHTML).toBe(
      '{"name":"\\u003c/script>"}',
    )
  })
})

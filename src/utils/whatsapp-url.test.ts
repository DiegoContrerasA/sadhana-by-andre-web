import { describe, expect, it } from "vitest"

import { getWhatsappUrl } from "./whatsapp-url"

describe("getWhatsappUrl", () => {
  it("encodes the message for the business number", () => {
    expect(getWhatsappUrl("¡Hola! 7:00 & más")).toBe(
      "https://wa.me/573122861377?text=%C2%A1Hola!%207%3A00%20%26%20m%C3%A1s",
    )
  })
})

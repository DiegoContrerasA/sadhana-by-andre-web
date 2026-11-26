import { describe, expect, it } from "vitest"

import es from "../../../../messages/es.json"
import { toLightboxLabels } from "./to-lightbox-labels"

describe("toLightboxLabels", () => {
  it("translates every control of the photo viewer", () => {
    const labels = toLightboxLabels(es.gallery.viewer)

    expect(labels.Close).toBe("Cerrar")
    expect(labels["Zoom in"]).toBe("Acercar")
    expect(Object.values(labels).every(Boolean)).toBe(true)
  })
})

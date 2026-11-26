import { describe, expect, it } from "vitest"

import en from "../../messages/en.json"
import es from "../../messages/es.json"

function getShape(value: unknown, path: string): string[] {
  if (typeof value !== "object" || value === null) return [path]

  return Object.entries(value).flatMap(([key, child]) =>
    getShape(child, `${path}.${key}`),
  )
}

describe("messages", () => {
  it("keeps the same keys in spanish and english", () => {
    expect(getShape(en, "root").sort()).toEqual(getShape(es, "root").sort())
  })
})

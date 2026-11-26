import { describe, expect, it } from "vitest"

import sitemap from "./sitemap"

describe("sitemap", () => {
  it("lists both pages with the same alternates the pages declare", () => {
    const entries = sitemap()

    expect(entries.map((entry) => entry.url)).toEqual([
      "https://sadhanabyandre.com",
      "https://sadhanabyandre.com/en",
    ])
    expect(Object.keys(entries[0]?.alternates?.languages ?? {})).toEqual([
      "es",
      "en",
      "x-default",
    ])
  })
})

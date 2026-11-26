import { describe, expect, it } from "vitest"

import { buildFaqSchema } from "./structured-data"

describe("buildFaqSchema", () => {
  it("maps each item to a question with its accepted answer", () => {
    const schema = buildFaqSchema([{ question: "Q", answer: "A" }])

    expect(schema.mainEntity).toEqual([
      {
        "@type": "Question",
        name: "Q",
        acceptedAnswer: { "@type": "Answer", text: "A" },
      },
    ])
  })
})

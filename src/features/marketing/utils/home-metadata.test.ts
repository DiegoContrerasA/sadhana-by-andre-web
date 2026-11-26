import { describe, expect, it } from "vitest"
import en from "../../../../messages/en.json"
import es from "../../../../messages/es.json"
import { buildHomeMetadata } from "./home-metadata"

const languageHrefs = { es: "/", en: "/en" }

describe("buildHomeMetadata", () => {
  it("points the canonical url to the current language", () => {
    const metadata = buildHomeMetadata({
      meta: en.meta,
      locale: "en",
      languageHrefs,
    })

    expect(metadata.alternates).toEqual({
      canonical: "/en",
      languages: { es: "/", en: "/en", "x-default": "/" },
    })
  })

  it("declares the other language as the alternate locale", () => {
    const metadata = buildHomeMetadata({
      meta: es.meta,
      locale: "es",
      languageHrefs,
    })

    expect(metadata.openGraph).toMatchObject({
      locale: "es_CO",
      alternateLocale: "en_US",
    })
  })
})

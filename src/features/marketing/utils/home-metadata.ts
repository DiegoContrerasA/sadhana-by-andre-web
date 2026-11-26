import type { Metadata } from "next"
import type { Locale, Messages } from "next-intl"

import { siteName } from "@/constants/site"

export type LanguageHrefs = Record<Locale, string>

const keywords =
  "yoga Envigado, yoga Medellín, yoga Sabaneta, clases de yoga Medellín, estudio de yoga Envigado, yoga prenatal Medellín, yoga facial Colombia, masaje Kobido Medellín, yoga grupal Envigado, instructora de yoga Medellín"

type HomeMetadataInput = {
  meta: Messages["meta"]
  locale: Locale
  languageHrefs: LanguageHrefs
}

export function buildHomeMetadata({
  meta,
  locale,
  languageHrefs,
}: HomeMetadataInput): Metadata {
  const { title, description } = meta
  const url = languageHrefs[locale]
  const image = { url: "/og.png", width: 1200, height: 630, alt: title }

  return {
    title,
    description,
    keywords,
    robots: "index, follow, max-snippet:160, max-image-preview:large",
    alternates: {
      canonical: url,
      languages: { ...languageHrefs, "x-default": languageHrefs.es },
    },
    openGraph: {
      type: "website",
      siteName,
      url,
      title,
      description,
      locale: meta.locale,
      alternateLocale: meta.locale === "es_CO" ? "en_US" : "es_CO",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  }
}

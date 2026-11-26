import type { Messages } from "next-intl"

import { siteName, siteUrl, whatsappNumber } from "@/constants/site"

const servedCities = [
  "Envigado",
  "Medellín",
  "Sabaneta",
  "Itagüí",
  "La Estrella",
]

const businessId = `${siteUrl}/#business`

function buildBusiness(description: string) {
  return {
    "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
    "@id": businessId,
    name: siteName,
    description,
    url: siteUrl,
    image: `${siteUrl}/og.png`,
    telephone: `+${whatsappNumber}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Envigado",
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
    geo: { "@type": "GeoCoordinates", latitude: 6.1701, longitude: -75.5937 },
    areaServed: servedCities.map((name) => ({ "@type": "City", name })),
    priceRange: "$$",
    sameAs: [
      "https://instagram.com/sadhanabyandre",
      "https://www.facebook.com/profile.php?id=61584988191074&locale=es_LA",
      "https://tiktok.com/@sadhanabyandre",
    ],
  }
}

export function buildSiteSchema(meta: Messages["meta"]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBusiness(meta.description),
      {
        "@type": "Person",
        "@id": `${siteUrl}/#instructor`,
        name: "Andre",
        jobTitle: meta.jobTitle,
        worksFor: { "@id": businessId },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        inLanguage: meta.lang,
      },
    ],
  }
}

export function buildFaqSchema(items: Messages["faq"]["items"]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  }
}

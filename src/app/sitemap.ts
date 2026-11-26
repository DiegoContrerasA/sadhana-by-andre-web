import type { MetadataRoute } from "next"

import { siteUrl } from "@/constants/site"

const pages = { es: siteUrl, en: `${siteUrl}/en` }

const languages = { ...pages, "x-default": pages.es }

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pages).map((url) => ({
    url,
    alternates: { languages },
  }))
}

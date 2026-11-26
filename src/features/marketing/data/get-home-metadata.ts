import "server-only"

import { getLocale, getMessages } from "next-intl/server"

import { buildHomeMetadata, type LanguageHrefs } from "../utils/home-metadata"

export async function getHomeMetadata(languageHrefs: LanguageHrefs) {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()])

  return buildHomeMetadata({ meta: messages.meta, locale, languageHrefs })
}

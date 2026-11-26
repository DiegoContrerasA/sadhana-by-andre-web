import "server-only"

import type { Metadata } from "next"
import { getMessages } from "next-intl/server"

import { siteName } from "@/constants/site"

import type { AppSection } from "../utils/app-section"

export async function getSectionMetadata(
  section: AppSection,
): Promise<Metadata> {
  const { app } = await getMessages()

  return {
    title: `${app.sections[section].title} | ${siteName}`,
    robots: { index: false, follow: false },
  }
}

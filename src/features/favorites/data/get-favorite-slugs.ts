import "server-only"

import { cookies } from "next/headers"

import { parseSlugList } from "@/utils/parse-slug-list"

import { favoritesCookieName } from "../utils/favorites-cookie"

export async function getFavoriteSlugs() {
  const cookieStore = await cookies()

  return parseSlugList(cookieStore.get(favoritesCookieName)?.value)
}

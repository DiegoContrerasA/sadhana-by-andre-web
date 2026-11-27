"use server"

import { cookies } from "next/headers"

import { preferenceCookieOptions } from "@/constants/preference-cookie"
import { slugSchema } from "@/utils/slug.schema"
import { addSlugFirst } from "@/utils/update-slug-list"

import { getFavoriteSlugs } from "../data/get-favorite-slugs"
import { favoritesCookieName } from "../utils/favorites-cookie"
import type { FavoriteResult } from "./favorite-result"

export async function addFavorite(input: unknown): Promise<FavoriteResult> {
  const parsed = slugSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: "invalidInput" }

  const slugs = addSlugFirst(await getFavoriteSlugs(), parsed.data)
  const cookieStore = await cookies()
  cookieStore.set(favoritesCookieName, slugs.join(","), preferenceCookieOptions)

  return { ok: true }
}

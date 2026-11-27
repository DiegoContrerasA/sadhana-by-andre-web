import { getMessages } from "next-intl/server"

import { getFavoriteSlugs } from "../data/get-favorite-slugs"
import { FavoriteButton } from "./favorite-button"

type SavedFavoriteButtonProps = {
  slug: string
  courseName: string
}

export async function SavedFavoriteButton({
  slug,
  courseName,
}: SavedFavoriteButtonProps) {
  const [{ favorites }, slugs] = await Promise.all([
    getMessages(),
    getFavoriteSlugs(),
  ])

  return (
    <FavoriteButton
      key={slug}
      copy={favorites.button}
      slug={slug}
      courseName={courseName}
      isFavorite={slugs.includes(slug)}
      variant="outline-primary"
    />
  )
}

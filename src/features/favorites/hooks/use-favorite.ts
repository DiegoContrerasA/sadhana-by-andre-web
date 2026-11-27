import { useOptimistic, useState, useTransition } from "react"

import { addFavorite } from "../actions/add-favorite"
import { removeFavorite } from "../actions/remove-favorite"

export function useFavorite(slug: string, isFavorite: boolean) {
  const [, startTransition] = useTransition()
  const [isShownAsFavorite, showAsFavorite] = useOptimistic(isFavorite)
  const [hasFailed, setHasFailed] = useState(false)

  function toggle() {
    const shouldSave = !isShownAsFavorite
    const request = shouldSave ? addFavorite : removeFavorite
    setHasFailed(false)
    startTransition(async () => {
      showAsFavorite(shouldSave)
      try {
        const result = await request(slug)
        setHasFailed(!result.ok)
      } catch {
        setHasFailed(true)
      }
    })
  }

  return { isShownAsFavorite, hasFailed, toggle }
}

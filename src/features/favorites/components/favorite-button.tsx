"use client"

import type { VariantProps } from "class-variance-authority"
import { HeartIcon } from "lucide-react"
import type { Messages } from "next-intl"

import { Button, type buttonVariants } from "@/components/ui/button"
import { useIsHydrated } from "@/hooks/use-is-hydrated"
import { cn } from "@/lib/utils"

import { useFavorite } from "../hooks/use-favorite"

type FavoriteButtonProps = {
  copy: Messages["favorites"]["button"]
  slug: string
  courseName: string
  isFavorite: boolean
  variant?: VariantProps<typeof buttonVariants>["variant"]
}

export function FavoriteButton({
  copy,
  slug,
  courseName,
  isFavorite,
  variant = "inverse",
}: FavoriteButtonProps) {
  const isHydrated = useIsHydrated()
  const favorite = useFavorite(slug, isFavorite)

  return (
    <div className="flex flex-col items-end gap-1">
      <Button
        variant={variant}
        size="icon"
        className="rounded-full"
        aria-label={`${copy.label}: ${courseName}`}
        aria-pressed={favorite.isShownAsFavorite}
        title={copy.label}
        disabled={!isHydrated}
        onClick={favorite.toggle}
      >
        <HeartIcon
          aria-hidden="true"
          className={cn(favorite.isShownAsFavorite && "fill-current")}
        />
      </Button>
      {favorite.hasFailed ? (
        <p
          role="alert"
          className="rounded-md bg-background px-2 py-1 text-xs text-destructive"
        >
          {copy.error}
        </p>
      ) : null}
    </div>
  )
}

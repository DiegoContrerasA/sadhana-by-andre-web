import type { Messages } from "next-intl"

import { LinkButton } from "@/components/link-button"

type EmptyCollectionProps = {
  copy: Messages["myCourses"]["empty"]
  exploreHref: string
}

export function EmptyCollection({ copy, exploreHref }: EmptyCollectionProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-primary/15 bg-background px-6 py-16 text-center">
      <h2 className="text-2xl">{copy.title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{copy.hint}</p>
      <LinkButton href={exploreHref} variant="default" size="pill">
        {copy.action}
      </LinkButton>
    </div>
  )
}

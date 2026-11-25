import type { ReactNode } from "react"

type ShowcaseSectionProps = {
  title: string
  description?: string
  children: ReactNode
}

export function ShowcaseSection({
  title,
  description,
  children,
}: ShowcaseSectionProps) {
  return (
    <section className="flex flex-col gap-4 rounded-xl border bg-card p-6">
      <header className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl">{title}</h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </header>
      {children}
    </section>
  )
}

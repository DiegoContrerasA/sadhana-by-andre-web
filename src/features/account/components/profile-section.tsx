import { type ReactNode, useId } from "react"

type ProfileSectionProps = {
  title: string
  description?: string
  children: ReactNode
}

export function ProfileSection({
  title,
  description,
  children,
}: ProfileSectionProps) {
  const titleId = useId()

  return (
    <section
      aria-labelledby={titleId}
      className="flex flex-col gap-5 rounded-xl border border-primary/15 bg-background p-5 sm:p-6"
    >
      <div className="flex flex-col gap-1">
        <h2 id={titleId} className="text-xl">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

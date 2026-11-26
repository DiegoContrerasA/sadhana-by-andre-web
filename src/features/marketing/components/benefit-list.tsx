type BenefitListProps = {
  benefits: ReadonlyArray<{ title: string; desc: string }>
}

export function BenefitList({ benefits }: BenefitListProps) {
  return (
    <ul className="flex flex-col gap-5">
      {benefits.map(({ title, desc }) => (
        <li key={title} className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
          />
          <div className="flex flex-col gap-0.5">
            <p className="font-medium">{title}</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {desc}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

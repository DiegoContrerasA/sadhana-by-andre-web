type SectionHeadingProps = {
  label: string
  heading: string
  headingEm: string
  subtitle: string
}

export function SectionHeading({
  label,
  heading,
  headingEm,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[0.65rem] tracking-[0.35em] text-primary uppercase">
        {label}
      </p>
      <h1 className="text-3xl leading-tight md:text-5xl">
        {heading} <em className="text-primary italic">{headingEm}</em>
      </h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  )
}

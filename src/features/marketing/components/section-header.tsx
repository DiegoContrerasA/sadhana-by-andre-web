import { cn } from "@/lib/utils"

import { SectionDivider } from "./section-divider"

type SectionHeaderProps = {
  label: string
  heading: string
  headingEm: string
  isStacked?: boolean
  className?: string
}

export function SectionHeader({
  label,
  heading,
  headingEm,
  isStacked = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <SectionDivider className="mb-16" />
      <p className="mb-4 text-[0.65rem] tracking-[0.35em] text-primary uppercase">
        {label}
      </p>
      <h2 className="text-4xl leading-tight md:text-5xl lg:text-6xl">
        {heading} {isStacked ? <br /> : null}
        <em className="text-primary italic">{headingEm}</em>
      </h2>
    </div>
  )
}

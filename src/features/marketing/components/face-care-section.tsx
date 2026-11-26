import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

import { SectionHeader } from "./section-header"

type FaceCareSectionProps = {
  id: string
  label: string
  heading: string
  headingEm: string
  media: ReactNode
  children: ReactNode
  className?: string
}

export function FaceCareSection({
  id,
  label,
  heading,
  headingEm,
  media,
  children,
  className,
}: FaceCareSectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-8 px-6 py-24 md:px-12 md:py-32", className)}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label={label}
          heading={heading}
          headingEm={headingEm}
          className="mb-16"
        />
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="flex flex-col items-start gap-10 md:col-span-6">
            {children}
          </div>
          <div className="md:col-span-5 md:col-start-8">{media}</div>
        </div>
      </div>
    </section>
  )
}

import { getMessages } from "next-intl/server"

import { SectionHeading } from "@/components/section-heading"

import type { AppSection } from "../utils/app-section"

type SectionScreenProps = {
  section: AppSection
}

export async function SectionScreen({ section }: SectionScreenProps) {
  const { app } = await getMessages()
  const { title, heading, headingEm, subtitle } = app.sections[section]

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        label={title}
        heading={heading}
        headingEm={headingEm}
        subtitle={subtitle}
      />
      <p className="rounded-lg border border-primary/15 bg-background px-6 py-16 text-center text-sm text-muted-foreground">
        {app.comingSoon}
      </p>
    </div>
  )
}

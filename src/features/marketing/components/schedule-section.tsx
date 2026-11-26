import type { Messages } from "next-intl"

import { ScheduleItem } from "./schedule-item"
import { SectionHeader } from "./section-header"

type ScheduleSectionProps = {
  schedule: Messages["schedule"]
}

export function ScheduleSection({ schedule }: ScheduleSectionProps) {
  return (
    <section id="horarios" className="scroll-mt-8 px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label={schedule.label}
          heading={schedule.heading}
          headingEm={schedule.headingEm}
          className="mb-20"
        />
        <ul className="border-b border-primary/15">
          {schedule.items.map((item) => (
            <ScheduleItem key={item.name} item={item} />
          ))}
        </ul>
        <p className="mt-10 text-[0.65rem] tracking-[0.2em] uppercase">
          {schedule.note}
        </p>
      </div>
    </section>
  )
}

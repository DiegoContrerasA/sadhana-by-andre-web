import type { Messages } from "next-intl"

import { EventCard } from "./event-card"
import { SectionHeader } from "./section-header"

type EventsSectionProps = {
  events: Messages["events"]
}

export function EventsSection({ events }: EventsSectionProps) {
  return (
    <section id="eventos" className="px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label={events.label}
          heading={events.heading}
          headingEm={events.headingEm}
          isStacked
          className="mb-20"
        />
        <ul className="flex flex-col gap-8">
          {events.items.map((event) => (
            <EventCard
              key={event.title}
              event={event}
              statusLabel={events.statusBadge}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

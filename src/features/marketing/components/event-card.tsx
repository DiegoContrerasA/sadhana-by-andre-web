import { CircleCheckIcon } from "lucide-react"
import type { Messages } from "next-intl"

type EventCardProps = {
  event: Messages["events"]["items"][number]
  statusLabel: string
}

export function EventCard({ event, statusLabel }: EventCardProps) {
  const { type, day, date, year, title, description } = event

  return (
    <li className="relative overflow-hidden border border-primary/15 p-8 md:p-12">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 -right-4 text-[120px] leading-none font-light text-primary/5 select-none md:text-[160px]"
      >
        {year}
      </span>
      <div className="relative flex flex-col gap-8 md:flex-row md:gap-12">
        <div className="flex shrink-0 flex-col gap-1">
          <p className="text-[10px] tracking-[0.3em] text-primary uppercase">
            {type}
          </p>
          <p className="text-6xl leading-none font-light text-primary md:text-7xl">
            {day}
          </p>
          <p className="text-sm text-primary">{date}</p>
        </div>
        <div
          aria-hidden="true"
          className="hidden w-px self-stretch bg-primary/15 md:block"
        />
        <div className="flex flex-1 flex-col gap-4">
          <p className="flex items-center gap-2 text-[10px] tracking-widest text-primary uppercase">
            <CircleCheckIcon aria-hidden="true" className="size-4 shrink-0" />
            {statusLabel}
          </p>
          <h3 className="text-2xl text-primary md:text-3xl lg:text-4xl">
            {title}
          </h3>
          <p className="max-w-xl leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </li>
  )
}

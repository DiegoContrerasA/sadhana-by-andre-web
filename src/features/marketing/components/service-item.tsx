import type { Messages } from "next-intl"

type ServiceItemProps = {
  service: Messages["services"]["items"][number]
}

export function ServiceItem({ service }: ServiceItemProps) {
  const { num, name, duration, description } = service

  return (
    <li className="flex flex-col gap-4 border-t border-border py-10">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span
            aria-hidden="true"
            className="text-xs tracking-[0.2em] text-muted-foreground"
          >
            {num}
          </span>
          <h3 className="text-2xl text-primary md:text-3xl">{name}</h3>
        </div>
        <span className="mt-2 shrink-0 text-xs tracking-widest text-primary uppercase">
          {duration}
        </span>
      </div>
      <p className="max-w-md leading-relaxed whitespace-pre-line text-muted-foreground">
        {description}
      </p>
    </li>
  )
}

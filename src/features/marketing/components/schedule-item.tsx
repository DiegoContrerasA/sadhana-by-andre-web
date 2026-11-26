import { ArrowUpRightIcon } from "lucide-react"
import type { Messages } from "next-intl"
import { useTranslations } from "next-intl"
import { LinkButton } from "@/components/link-button"
import { Badge } from "@/components/ui/badge"
import { getWhatsappUrl } from "../utils/whatsapp-url"

type ScheduleItemProps = {
  item: Messages["schedule"]["items"][number]
}

export function ScheduleItem({ item }: ScheduleItemProps) {
  const t = useTranslations("schedule")
  const { name, day, time, description, online } = item
  const tags = online
    ? [t("tagPresencial"), t("tagOnline")]
    : [t("tagPresencial")]

  return (
    <li className="flex flex-col gap-6 border-t border-primary/15 py-10 lg:flex-row lg:items-center">
      <div className="shrink-0 sm:w-24">
        <p className="text-2xl font-light text-primary md:text-3xl">{day}</p>
        <p className="text-sm tracking-wide">{time}</p>
      </div>
      <div
        aria-hidden="true"
        className="mx-4 hidden h-10 w-px shrink-0 bg-primary/15 lg:block"
      />
      <div className="flex flex-1 flex-col gap-3">
        <div>
          <p className="text-[0.6rem] font-medium tracking-widest uppercase">
            {t("classLabel")}
          </p>
          <h3 className="text-2xl text-primary md:text-3xl">{name}</h3>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="soft" size="lg" className="self-center">
            {tag}
          </Badge>
        ))}
        <LinkButton
          href={getWhatsappUrl(t("waMessage", { name, day, time }))}
          isExternal
          variant="outline-primary"
          size="pill"
        >
          {t("reserveBtn")}
          <ArrowUpRightIcon aria-hidden="true" className="size-3" />
        </LinkButton>
      </div>
    </li>
  )
}

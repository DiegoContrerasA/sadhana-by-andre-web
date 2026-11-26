import { ArrowUpRightIcon } from "lucide-react"
import type { Messages } from "next-intl"
import { useTranslations } from "next-intl"
import { LinkButton } from "@/components/link-button"
import { Badge } from "@/components/ui/badge"

import { getWhatsappUrl } from "../utils/whatsapp-url"

type ScheduleActionsProps = {
  item: Messages["schedule"]["items"][number]
}

export function ScheduleActions({ item }: ScheduleActionsProps) {
  const t = useTranslations("schedule")
  const { name, day, time, online } = item
  const tags = online
    ? [t("tagPresencial"), t("tagOnline")]
    : [t("tagPresencial")]

  return (
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
  )
}

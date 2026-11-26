import { ArrowUpRightIcon } from "lucide-react"
import type { Messages } from "next-intl"

import { LinkButton } from "@/components/link-button"

import { getWhatsappUrl } from "../utils/whatsapp-url"

type TrialClassActionsProps = {
  cta: Messages["cta"]
}

export function TrialClassActions({ cta }: TrialClassActionsProps) {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <LinkButton
        href={getWhatsappUrl(cta.waMessage)}
        isExternal
        variant="inverse"
      >
        {cta.primaryBtn}
        <ArrowUpRightIcon aria-hidden="true" className="size-4" />
      </LinkButton>
      <LinkButton href="#servicios" variant="outline-inverse">
        {cta.secondaryBtn}
      </LinkButton>
    </div>
  )
}

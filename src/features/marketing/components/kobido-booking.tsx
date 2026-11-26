import type { Messages } from "next-intl"

import { LinkButton } from "@/components/link-button"
import { kobidoBookingUrl } from "@/constants/site"

import { getWhatsappUrl } from "../utils/whatsapp-url"

type KobidoBookingProps = {
  kobido: Messages["kobido"]
}

export function KobidoBooking({ kobido }: KobidoBookingProps) {
  return (
    <div className="flex flex-col items-start gap-4">
      <LinkButton href={kobidoBookingUrl} isExternal>
        {kobido.cta}
      </LinkButton>
      <span className="text-sm text-muted-foreground">{kobido.ctaSub}</span>
      <a
        href={getWhatsappUrl(kobido.waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-primary underline underline-offset-4"
      >
        {kobido.ctaWhatsApp}
      </a>
    </div>
  )
}

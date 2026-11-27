import Image from "next/image"
import type { Messages } from "next-intl"
import { LinkButton } from "@/components/link-button"
import { kobidoBookingUrl } from "@/constants/site"
import { getWhatsappUrl } from "@/utils/whatsapp-url"
import kobidoImage from "../assets/kobido.png"
import { BenefitList } from "./benefit-list"
import { FaceCareSection } from "./face-care-section"

type KobidoSectionProps = {
  kobido: Messages["kobido"]
}

export function KobidoSection({ kobido }: KobidoSectionProps) {
  const media = (
    <Image
      src={kobidoImage}
      alt={kobido.imgAlt}
      sizes="(min-width: 768px) 42vw, 100vw"
      className="aspect-3/4 w-full object-cover"
    />
  )

  return (
    <FaceCareSection
      id="kobido"
      label={kobido.label}
      heading={kobido.heading}
      headingEm={kobido.headingEm}
      media={media}
      className="bg-secondary"
    >
      <p className="leading-relaxed text-muted-foreground md:text-lg">
        {kobido.body}
      </p>
      <BenefitList benefits={kobido.benefits} />
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
    </FaceCareSection>
  )
}

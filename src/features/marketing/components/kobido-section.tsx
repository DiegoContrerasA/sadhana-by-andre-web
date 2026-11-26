import Image from "next/image"
import type { Messages } from "next-intl"

import kobidoImage from "../assets/kobido.png"
import { BenefitList } from "./benefit-list"
import { FaceCareSection } from "./face-care-section"
import { KobidoBooking } from "./kobido-booking"

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
      <KobidoBooking kobido={kobido} />
    </FaceCareSection>
  )
}

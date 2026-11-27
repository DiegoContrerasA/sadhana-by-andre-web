import type { Messages } from "next-intl"

import { LinkButton } from "@/components/link-button"

import { getWhatsappUrl } from "@/utils/whatsapp-url"
import { BenefitList } from "./benefit-list"
import { FaceCareSection } from "./face-care-section"
import { FacialVideo } from "./facial-video"

type FacialYogaSectionProps = {
  yogaFacial: Messages["yogaFacial"]
}

export function FacialYogaSection({ yogaFacial }: FacialYogaSectionProps) {
  const { label, heading, headingEm, body, benefits, cta, waMessage } =
    yogaFacial

  return (
    <FaceCareSection
      id="yoga-facial"
      label={label}
      heading={heading}
      headingEm={headingEm}
      media={
        <FacialVideo
          playLabel={yogaFacial.playLabel}
          pauseLabel={yogaFacial.pauseLabel}
        />
      }
    >
      <p className="leading-relaxed text-muted-foreground md:text-lg">{body}</p>
      <BenefitList benefits={benefits} />
      <LinkButton href={getWhatsappUrl(waMessage)} isExternal>
        {cta}
      </LinkButton>
    </FaceCareSection>
  )
}

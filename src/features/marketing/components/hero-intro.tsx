import type { Messages } from "next-intl"

import { LinkButton } from "@/components/link-button"
import { cn } from "@/lib/utils"

import { getWhatsappUrl } from "@/utils/whatsapp-url"
import { HeroBrand } from "./hero-brand"

type HeroIntroProps = {
  hero: Messages["hero"]
}

const enter = "md:animate-hero-enter md:motion-reduce:animate-none"
const tagline = "font-light tracking-[0.18em] uppercase text-shadow-md"

export function HeroIntro({ hero }: HeroIntroProps) {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-between px-12 py-28 sm:justify-start sm:gap-10 md:items-start md:justify-center md:py-0">
      <div className="flex flex-col items-center gap-5 text-center md:items-start md:gap-10 md:text-left">
        <HeroBrand
          logoAlt={hero.logoAlt}
          byline={hero.byline}
          headline={hero.headline}
        />
        <div className="flex flex-col gap-1 text-overlay-foreground md:text-overlay-foreground/80">
          <p
            className={cn(
              enter,
              tagline,
              "text-lg [animation-delay:400ms] md:text-xl",
            )}
          >
            {hero.tagline1}
          </p>
          <p
            className={cn(
              enter,
              tagline,
              "text-base [animation-delay:520ms] md:text-lg",
            )}
          >
            {hero.tagline2}
          </p>
        </div>
      </div>
      <LinkButton
        href={getWhatsappUrl(hero.waMessage)}
        isExternal
        className={cn(enter, "mb-10 [animation-delay:650ms]")}
      >
        {hero.cta}
      </LinkButton>
    </div>
  )
}

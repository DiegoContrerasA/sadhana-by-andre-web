import Image from "next/image"
import type { Messages } from "next-intl"
import { useTranslations } from "next-intl"

import photo from "../assets/footer.png"
import { SocialLinks } from "./social-links"

type SiteFooterProps = {
  footer: Messages["footer"]
  year: number
}

export function SiteFooter({ footer, year }: SiteFooterProps) {
  const t = useTranslations("footer")

  return (
    <footer className="overflow-hidden bg-overlay text-overlay-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-16 px-6 pt-24 md:grid-cols-2 md:px-12 md:pt-32">
        <div className="pb-16 md:pb-24">
          <p className="mb-8 text-[0.65rem] tracking-[0.35em] text-overlay-foreground/60 uppercase">
            {footer.label}
          </p>
          <h2 className="mb-14 text-5xl leading-tight md:text-6xl lg:text-[5.5rem]">
            {footer.heading} <br />
            {footer.headingEm}
          </h2>
          <SocialLinks socials={footer.socials} />
        </div>
        <Image
          src={photo}
          alt={footer.imgAlt}
          sizes="560px"
          className="hidden h-auto w-full self-end grayscale md:block"
        />
      </div>
      <div className="border-t border-overlay-foreground/10 px-6 py-6 text-[0.65rem] text-overlay-foreground/60 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:justify-between">
          <p>{t("copyright", { year: String(year) })}</p>
          <p className="tracking-[0.2em] uppercase">{footer.tagline}</p>
        </div>
      </div>
    </footer>
  )
}

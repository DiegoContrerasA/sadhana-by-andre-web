import { ArrowUpRightIcon, SparklesIcon } from "lucide-react"
import Image from "next/image"
import type { Messages } from "next-intl"
import { LinkButton } from "@/components/link-button"
import { Badge } from "@/components/ui/badge"
import { getWhatsappUrl } from "@/utils/whatsapp-url"
import backgroundImage from "../assets/cta.jpeg"

type TrialClassSectionProps = {
  cta: Messages["cta"]
}

export function TrialClassSection({ cta }: TrialClassSectionProps) {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden py-16">
      <Image
        src={backgroundImage}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-primary/90" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grain opacity-5 mix-blend-overlay"
      />
      <div className="relative flex max-w-2xl flex-col items-center gap-8 px-6 text-center text-overlay-foreground">
        <Badge
          variant="outline-inverse"
          size="lg"
          className="tracking-[0.25em] uppercase"
        >
          <SparklesIcon aria-hidden="true" />
          {cta.badge}
        </Badge>
        <h2 className="text-5xl leading-tight md:text-6xl lg:text-7xl">
          {cta.heading} <br />
          <em className="italic">{cta.headingEm}</em>
        </h2>
        <p className="max-w-lg leading-relaxed md:text-lg">{cta.body}</p>
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
      </div>
    </section>
  )
}

import Image from "next/image"
import type { Messages } from "next-intl"

import aboutImage from "../assets/about.jpeg"

type AboutSectionProps = {
  about: Messages["about"]
}

export function AboutSection({ about }: AboutSectionProps) {
  const paragraphs = [about.p1, about.p2, about.p3, about.p4]

  return (
    <section
      id="sobre-mi"
      className="scroll-mt-8 bg-secondary px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-20 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-md self-start lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-5 border border-primary"
          />
          <Image
            src={aboutImage}
            alt={about.imgAlt}
            sizes="(min-width: 1024px) 560px, 448px"
            className="relative aspect-4/5 w-full object-cover"
          />
        </div>
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col gap-5">
            <p className="text-[0.65rem] tracking-[0.35em] text-primary uppercase">
              {about.label}
            </p>
            <h2 className="text-4xl leading-tight md:text-5xl lg:text-[3.5rem]">
              {about.heading} <br />
              <em className="text-primary italic">{about.headingEm}</em>
            </h2>
          </div>
          <div className="flex flex-col gap-5 leading-relaxed">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <blockquote className="border-l-2 border-primary pl-5 text-lg leading-snug font-light text-primary italic md:text-xl">
              <p>{about.quote}</p>
            </blockquote>
          </div>
          <div aria-hidden="true" className="h-px w-10 bg-primary" />
        </div>
      </div>
    </section>
  )
}

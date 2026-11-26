import Image from "next/image"

import logo from "../assets/logo.png"

type HeroBrandProps = {
  logoAlt: string
  byline: string
  headline: string
}

const enter = "md:animate-hero-enter md:motion-reduce:animate-none"

export function HeroBrand({ logoAlt, byline, headline }: HeroBrandProps) {
  return (
    <div className="flex flex-col items-center md:items-start">
      <div className={`${enter} [animation-delay:100ms]`}>
        <Image
          src={logo}
          alt={logoAlt}
          sizes="(min-width: 768px) 384px, 288px"
          preload
          className="h-auto w-72 drop-shadow-lg md:w-96"
        />
      </div>
      <p
        className={`${enter} text-xs tracking-[0.35em] text-overlay-foreground/70 uppercase [animation-delay:250ms]`}
      >
        {byline}
      </p>
      <h1
        className={`${enter} mt-5 text-xl text-overlay-foreground text-shadow-md [animation-delay:320ms] md:text-3xl`}
      >
        {headline}
      </h1>
    </div>
  )
}

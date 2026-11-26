import type { Locale, Messages } from "next-intl"

import type { LanguageHrefs } from "../utils/home-metadata"
import { HeroBackground } from "./hero-background"
import { HeroIntro } from "./hero-intro"
import { HeroStats } from "./hero-stats"
import { SiteNav } from "./site-nav"

type HeroProps = {
  hero: Messages["hero"]
  nav: Messages["nav"]
  locale: Locale
  languageHrefs: LanguageHrefs
}

export function Hero({ hero, nav, locale, languageHrefs }: HeroProps) {
  return (
    <header className="relative h-dvh w-full overflow-hidden">
      <SiteNav nav={nav} locale={locale} languageHrefs={languageHrefs} />
      <HeroBackground />
      <HeroIntro hero={hero} />
      <HeroStats stats={hero.stats} />
    </header>
  )
}

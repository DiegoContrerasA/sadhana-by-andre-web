import type { Locale, Messages } from "next-intl"

import type { LanguageHrefs } from "../utils/home-metadata"
import { LanguageSwitcher } from "./language-switcher"
import { MobileMenu } from "./mobile-menu"
import { NavBar } from "./nav-bar"

type SiteNavProps = {
  nav: Messages["nav"]
  locale: Locale
  languageHrefs: LanguageHrefs
}

export function SiteNav({ nav, locale, languageHrefs }: SiteNavProps) {
  const switcher = (
    <LanguageSwitcher
      label={nav.languageLabel}
      currentLocale={locale}
      hrefs={languageHrefs}
    />
  )

  return (
    <NavBar>
      <nav aria-label={nav.ariaNav} className="hidden md:block">
        <ul className="flex items-center gap-6 lg:gap-10">
          {nav.links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm tracking-[0.22em] text-overlay-foreground/80 uppercase underline-offset-6 text-shadow-md hover:text-overlay-foreground hover:underline"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="md:absolute md:right-8">{switcher}</div>
      <div className="md:hidden">
        <MobileMenu nav={nav}>{switcher}</MobileMenu>
      </div>
    </NavBar>
  )
}

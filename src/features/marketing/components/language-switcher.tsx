import Link from "next/link"
import type { Locale } from "next-intl"

import { cn } from "@/lib/utils"

import type { LanguageHrefs } from "../utils/home-metadata"

const languages = ["es", "en"] as const

type LanguageSwitcherProps = {
  label: string
  currentLocale: Locale
  hrefs: LanguageHrefs
  className?: string
}

export function LanguageSwitcher({
  label,
  currentLocale,
  hrefs,
  className,
}: LanguageSwitcherProps) {
  return (
    <nav
      aria-label={label}
      className={cn(
        "flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-shadow-md",
        className,
      )}
    >
      {languages.map((language) => (
        <Link
          key={language}
          href={hrefs[language]}
          hrefLang={language}
          aria-current={language === currentLocale ? "true" : undefined}
          className="p-1 text-overlay-foreground/50 transition-colors duration-300 hover:text-overlay-foreground aria-current:text-overlay-foreground"
        >
          {language}
        </Link>
      ))}
    </nav>
  )
}

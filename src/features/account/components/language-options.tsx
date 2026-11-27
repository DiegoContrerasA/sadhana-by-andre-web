import Link from "next/link"
import type { Locale } from "next-intl"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const languages = [
  { locale: "es", name: "Español" },
  { locale: "en", name: "English" },
] as const

type LanguageOptionsProps = {
  current: Locale
  hrefs: Record<Locale, string>
}

export function LanguageOptions({ current, hrefs }: LanguageOptionsProps) {
  return (
    <ul className="flex flex-wrap gap-3">
      {languages.map(({ locale, name }) => (
        <li key={locale}>
          <Link
            href={hrefs[locale]}
            lang={locale}
            hrefLang={locale}
            aria-current={locale === current ? "true" : undefined}
            className={cn(
              buttonVariants({
                variant: locale === current ? "default" : "outline-primary",
                size: "pill",
              }),
            )}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

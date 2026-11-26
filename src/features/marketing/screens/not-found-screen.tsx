import { useLocale, useTranslations } from "next-intl"

import { LinkButton } from "@/components/link-button"

type NotFoundScreenProps = {
  homeHref: string
  englishHomeHref: string
}

export function NotFoundScreen({
  homeHref,
  englishHomeHref,
}: NotFoundScreenProps) {
  const t = useTranslations("notFound")
  const locale = useLocale()

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl md:text-5xl">{t("title")}</h1>
      <p className="text-muted-foreground">{t("body")}</p>
      <LinkButton href={locale === "en" ? englishHomeHref : homeHref}>
        {t("cta")}
      </LinkButton>
    </main>
  )
}

import { Loader2Icon } from "lucide-react"
import { useTranslations } from "next-intl"

export function ResetLinkLoading() {
  const t = useTranslations("auth.resetPassword")

  return (
    <div role="status" className="flex flex-col items-center gap-4 text-center">
      <Loader2Icon
        aria-hidden="true"
        className="size-8 animate-spin text-primary motion-reduce:animate-none"
      />
      <p className="text-lg font-medium">{t("validating")}</p>
      <p className="text-sm text-muted-foreground">{t("validatingHint")}</p>
    </div>
  )
}

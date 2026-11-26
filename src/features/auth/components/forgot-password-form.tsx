"use client"

import { MailIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { FormError } from "@/components/form/form-error"
import { FormSuccess } from "@/components/form/form-success"
import { SubmitButton } from "@/components/form/submit-button"
import { TextField } from "@/components/form/text-field"
import { LinkButton } from "@/components/link-button"
import { useIsHydrated } from "@/hooks/use-is-hydrated"
import { focusElement } from "@/utils/focus-element"

import { useForgotPasswordForm } from "../hooks/use-forgot-password-form"
import { AuthLink } from "./auth-link"

type ForgotPasswordFormProps = {
  signInHref: string
  mockResetHref: string
}

export function ForgotPasswordForm({
  signInHref,
  mockResetHref,
}: ForgotPasswordFormProps) {
  const t = useTranslations("auth.forgotPassword")
  const form = useForgotPasswordForm()
  const isHydrated = useIsHydrated()

  if (form.isSuccess) {
    return (
      <div
        ref={focusElement}
        tabIndex={-1}
        className="flex flex-col gap-6 outline-none"
      >
        <FormSuccess message={t("success")} />
        <LinkButton href={mockResetHref}>{t("mockLink")}</LinkButton>
        <AuthLink href={signInHref} className="self-center">
          {t("back")}
        </AuthLink>
      </div>
    )
  }

  return (
    <form
      method="post"
      noValidate
      autoComplete="off"
      onSubmit={form.submit}
      className="flex flex-col gap-6"
    >
      <TextField
        control={form.control}
        name="email"
        label={t("email")}
        placeholder={t("emailPlaceholder")}
        icon={MailIcon}
        type="email"
        inputMode="email"
        autoComplete="off"
        autoCapitalize="none"
      />
      <FormError message={form.errorMessage} shouldFocus />
      <SubmitButton
        size="lg"
        disabled={!isHydrated}
        isPending={form.isPending}
        pendingLabel={t("pending")}
      >
        {t("submit")}
      </SubmitButton>
      <AuthLink href={signInHref} className="self-center">
        {t("back")}
      </AuthLink>
    </form>
  )
}

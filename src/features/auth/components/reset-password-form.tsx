"use client"

import { useTranslations } from "next-intl"

import { FormError } from "@/components/form/form-error"
import { FormSuccess } from "@/components/form/form-success"
import { PasswordField } from "@/components/form/password-field"
import { SubmitButton } from "@/components/form/submit-button"
import { LinkButton } from "@/components/link-button"
import { useIsHydrated } from "@/hooks/use-is-hydrated"
import { focusElement } from "@/utils/focus-element"

import { useResetPasswordForm } from "../hooks/use-reset-password-form"

type ResetPasswordFormProps = {
  token: string
  signInHref: string
}

export function ResetPasswordForm({
  token,
  signInHref,
}: ResetPasswordFormProps) {
  const t = useTranslations("auth.resetPassword")
  const form = useResetPasswordForm(token)
  const isHydrated = useIsHydrated()

  if (form.isSuccess) {
    return (
      <div
        ref={focusElement}
        tabIndex={-1}
        className="flex flex-col gap-6 outline-none"
      >
        <FormSuccess message={t("success")} />
        <LinkButton href={signInHref}>{t("signIn")}</LinkButton>
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
      <PasswordField
        control={form.control}
        name="password"
        label={t("password")}
        placeholder={t("passwordPlaceholder")}
        description={t("passwordHint")}
        showLabel={t("showPassword")}
        hideLabel={t("hidePassword")}
        autoComplete="new-password"
      />
      <PasswordField
        control={form.control}
        name="confirmPassword"
        label={t("confirmPassword")}
        placeholder={t("confirmPlaceholder")}
        showLabel={t("showPassword")}
        hideLabel={t("hidePassword")}
        autoComplete="new-password"
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
    </form>
  )
}

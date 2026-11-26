"use client"

import { MailIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { FormError } from "@/components/form/form-error"
import { FormSuccess } from "@/components/form/form-success"
import { PasswordField } from "@/components/form/password-field"
import { SubmitButton } from "@/components/form/submit-button"
import { TextField } from "@/components/form/text-field"
import { GoogleButton } from "@/components/google-button"
import { FieldSeparator } from "@/components/ui/field"
import { useIsHydrated } from "@/hooks/use-is-hydrated"

import { useSignInForm } from "../hooks/use-sign-in-form"
import { AuthLink } from "./auth-link"

type SignInFormProps = {
  signUpHref: string
  forgotPasswordHref: string
}

export function SignInForm({
  signUpHref,
  forgotPasswordHref,
}: SignInFormProps) {
  const t = useTranslations("auth.signIn")
  const form = useSignInForm()
  const isBusy = form.pendingMethod !== null
  const isHydrated = useIsHydrated()

  return (
    <div className="flex flex-col gap-8">
      <GoogleButton
        isPending={form.pendingMethod === "google"}
        pendingLabel={t("googlePending")}
        disabled={isBusy}
        onClick={form.submitGoogle}
      >
        {t("google")}
      </GoogleButton>
      <FieldSeparator>{t("separator")}</FieldSeparator>
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
        <div className="flex flex-col gap-4">
          <PasswordField
            control={form.control}
            name="password"
            label={t("password")}
            placeholder={t("passwordPlaceholder")}
            showLabel={t("showPassword")}
            hideLabel={t("hidePassword")}
            autoComplete="new-password"
          />
          <AuthLink href={forgotPasswordHref} className="self-end">
            {t("forgotPassword")}
          </AuthLink>
        </div>
        <FormError message={form.errorMessage} shouldFocus />
        <FormSuccess message={form.isSuccess ? t("success") : undefined} />
        <SubmitButton
          size="lg"
          disabled={!isHydrated || isBusy}
          isPending={form.pendingMethod === "email"}
          pendingLabel={t("pending")}
        >
          {t("submit")}
        </SubmitButton>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        {t("noAccount")}{" "}
        <AuthLink href={signUpHref}>{t("createAccount")}</AuthLink>
      </p>
    </div>
  )
}

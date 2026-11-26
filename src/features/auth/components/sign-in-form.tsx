"use client"

import { CircleCheckIcon, MailIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { FormError } from "@/components/form/form-error"
import { PasswordField } from "@/components/form/password-field"
import { SubmitButton } from "@/components/form/submit-button"
import { TextField } from "@/components/form/text-field"
import { GoogleButton } from "@/components/google-button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FieldSeparator } from "@/components/ui/field"

import { useSignIn } from "../hooks/use-sign-in"
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
  const form = useSignIn()
  const isBusy = form.pendingMethod !== null

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
        <PasswordField
          control={form.control}
          name="password"
          label={t("password")}
          showLabel={t("showPassword")}
          hideLabel={t("hidePassword")}
          autoComplete="new-password"
        />
        <AuthLink href={forgotPasswordHref} className="-mt-2 self-end">
          {t("forgotPassword")}
        </AuthLink>
        <FormError message={form.errorMessage} />
        {form.isSuccess ? (
          <Alert role="status">
            <CircleCheckIcon aria-hidden="true" />
            <AlertDescription>{t("success")}</AlertDescription>
          </Alert>
        ) : null}
        <SubmitButton
          size="lg"
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

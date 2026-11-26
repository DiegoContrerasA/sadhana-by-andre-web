"use client"

import { MailIcon, PhoneIcon, UserIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { FormError } from "@/components/form/form-error"
import { FormSuccess } from "@/components/form/form-success"
import { PasswordField } from "@/components/form/password-field"
import { SubmitButton } from "@/components/form/submit-button"
import { TextField } from "@/components/form/text-field"
import { GoogleButton } from "@/components/google-button"
import { FieldSeparator } from "@/components/ui/field"

import { useSignUp } from "../hooks/use-sign-up"
import { AuthLink } from "./auth-link"

type SignUpFormProps = {
  signInHref: string
}

export function SignUpForm({ signInHref }: SignUpFormProps) {
  const t = useTranslations("auth.signUp")
  const form = useSignUp()
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
        <div className="grid gap-6 sm:grid-cols-2 sm:items-start sm:gap-4">
          <TextField
            control={form.control}
            name="firstName"
            label={t("firstName")}
            placeholder={t("firstNamePlaceholder")}
            icon={UserIcon}
            autoComplete="off"
            autoCapitalize="words"
          />
          <TextField
            control={form.control}
            name="lastName"
            label={t("lastName")}
            placeholder={t("lastNamePlaceholder")}
            icon={UserIcon}
            autoComplete="off"
            autoCapitalize="words"
          />
        </div>
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
        <TextField
          control={form.control}
          name="phone"
          label={t("phone")}
          placeholder={t("phonePlaceholder")}
          icon={PhoneIcon}
          type="tel"
          inputMode="tel"
          autoComplete="off"
        />
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
        <FormError message={form.errorMessage} />
        <FormSuccess message={form.isSuccess ? t("success") : undefined} />
        <SubmitButton
          size="lg"
          isPending={form.pendingMethod === "email"}
          pendingLabel={t("pending")}
        >
          {t("submit")}
        </SubmitButton>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        {t("hasAccount")} <AuthLink href={signInHref}>{t("signIn")}</AuthLink>
      </p>
    </div>
  )
}

"use client"

import { PhoneIcon, UserIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { FormError } from "@/components/form/form-error"
import { FormSuccess } from "@/components/form/form-success"
import { SubmitButton } from "@/components/form/submit-button"
import { TextField } from "@/components/form/text-field"
import { useIsHydrated } from "@/hooks/use-is-hydrated"

import { useProfileForm } from "../hooks/use-profile-form"
import type { ProfileValues } from "../schema/profile.schema"
import { ReadOnlyEmail } from "./read-only-email"

type ProfileFormProps = {
  defaultValues: ProfileValues
  email: string
}

export function ProfileForm({ defaultValues, email }: ProfileFormProps) {
  const t = useTranslations("profile.form")
  const form = useProfileForm(defaultValues)
  const isHydrated = useIsHydrated()

  return (
    <form
      method="post"
      noValidate
      onSubmit={form.submit}
      className="flex flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2 sm:items-start sm:gap-4">
        <TextField
          control={form.control}
          name="firstName"
          label={t("firstName")}
          icon={UserIcon}
          autoComplete="given-name"
          autoCapitalize="words"
        />
        <TextField
          control={form.control}
          name="lastName"
          label={t("lastName")}
          icon={UserIcon}
          autoComplete="family-name"
          autoCapitalize="words"
        />
      </div>
      <TextField
        control={form.control}
        name="phone"
        label={t("phone")}
        icon={PhoneIcon}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
      />
      <ReadOnlyEmail
        label={t("email")}
        description={t("emailHint")}
        email={email}
      />
      <FormError message={form.errorMessage} shouldFocus />
      <FormSuccess message={form.isSaved ? t("success") : undefined} />
      <SubmitButton
        size="pill"
        className="self-start"
        disabled={!isHydrated}
        isPending={form.isPending}
        pendingLabel={t("pending")}
      >
        {t("submit")}
      </SubmitButton>
    </form>
  )
}

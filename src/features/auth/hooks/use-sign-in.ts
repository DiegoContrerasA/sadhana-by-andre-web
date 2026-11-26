import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { useForm } from "react-hook-form"

import { signIn } from "../actions/sign-in"
import { createSignInSchema, type SignInValues } from "../schema/sign-in.schema"
import { useAuthRequest } from "./use-auth-request"

export function useSignIn() {
  const t = useTranslations("auth.signIn.errors")
  const schema = useMemo(
    () =>
      createSignInSchema({
        emailRequired: t("emailRequired"),
        emailInvalid: t("emailInvalid"),
        passwordRequired: t("passwordRequired"),
      }),
    [t],
  )
  const { control, handleSubmit, clearErrors } = useForm<SignInValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  })
  const request = useAuthRequest<"invalidCredentials">()

  return {
    control,
    submit: handleSubmit((values) => request.submitEmail(() => signIn(values))),
    submitGoogle: () => {
      clearErrors()
      request.submitGoogle()
    },
    pendingMethod: request.pendingMethod,
    isSuccess: request.isSuccess,
    errorMessage: request.error ? t(request.error) : undefined,
  }
}

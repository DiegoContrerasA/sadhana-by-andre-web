import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import { requestPasswordReset } from "../actions/request-password-reset"
import {
  createForgotPasswordSchema,
  type ForgotPasswordValues,
} from "../schema/forgot-password.schema"
import { useAuthRequest } from "./use-auth-request"

export function useForgotPasswordForm() {
  const t = useTranslations("auth.forgotPassword.errors")
  const schema = createForgotPasswordSchema({
    emailRequired: t("emailRequired"),
    emailInvalid: t("emailInvalid"),
  })
  const { control, handleSubmit } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  })
  const request = useAuthRequest<"invalidInput">()

  return {
    control,
    submit: handleSubmit(
      (values) => request.submitEmail(() => requestPasswordReset(values)),
      request.reset,
    ),
    isPending: request.pendingMethod !== null,
    isSuccess: request.isSuccess,
    errorMessage: request.error ? t(request.error) : undefined,
  }
}

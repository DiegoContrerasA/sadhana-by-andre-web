import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"

import { resetPassword } from "../actions/reset-password"
import {
  createResetPasswordSchema,
  type ResetPasswordValues,
} from "../schema/reset-password.schema"
import { useAuthRequest } from "./use-auth-request"

export function useResetPasswordForm(token: string) {
  const t = useTranslations("auth.resetPassword.errors")
  const schema = createResetPasswordSchema((key) => t(key))
  const { control, handleSubmit } = useForm<ResetPasswordValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirmPassword: "" },
  })
  const request = useAuthRequest<"invalidToken" | "invalidInput">()

  return {
    control,
    submit: handleSubmit(
      (values) => request.submitEmail(() => resetPassword(token, values)),
      request.reset,
    ),
    isPending: request.pendingMethod !== null,
    isSuccess: request.isSuccess,
    errorMessage: request.error ? t(request.error) : undefined,
  }
}

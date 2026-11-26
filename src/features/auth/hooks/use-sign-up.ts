import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { useForm } from "react-hook-form"

import { signUp } from "../actions/sign-up"
import { createSignUpSchema, type SignUpValues } from "../schema/sign-up.schema"
import { useAuthRequest } from "./use-auth-request"

const defaultValues: SignUpValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
}

export function useSignUp() {
  const t = useTranslations("auth.signUp.errors")
  const schema = useMemo(() => createSignUpSchema((key) => t(key)), [t])
  const { control, handleSubmit, clearErrors, setError } =
    useForm<SignUpValues>({ resolver: zodResolver(schema), defaultValues })
  const request = useAuthRequest<"emailTaken" | "invalidInput">()
  const generalError = request.error === "emailTaken" ? null : request.error

  function showEmailError(error: string) {
    if (error !== "emailTaken") return
    setError("email", { message: t("emailTaken") }, { shouldFocus: true })
  }

  return {
    control,
    submit: handleSubmit((values) =>
      request.submitEmail(() => signUp(values), showEmailError),
    ),
    submitGoogle: () => {
      clearErrors()
      request.submitGoogle()
    },
    pendingMethod: request.pendingMethod,
    isSuccess: request.isSuccess,
    errorMessage: generalError ? t(generalError) : undefined,
  }
}

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
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

export function useSignUpForm() {
  const t = useTranslations("auth.signUp.errors")
  const schema = createSignUpSchema((key) => t(key))
  const { control, handleSubmit, clearErrors, setError, getValues } =
    useForm<SignUpValues>({ resolver: zodResolver(schema), defaultValues })
  const request = useAuthRequest<"emailTaken" | "invalidInput">()
  const generalError = request.error === "emailTaken" ? null : request.error

  function showEmailError(error: string, submittedEmail: string) {
    const currentEmail = getValues("email").trim().toLowerCase()
    if (error !== "emailTaken" || currentEmail !== submittedEmail) return
    setError("email", { message: t("emailTaken") }, { shouldFocus: true })
  }

  return {
    control,
    submit: handleSubmit(
      (values) =>
        request.submitEmail(
          () => signUp(values),
          (error) => showEmailError(error, values.email),
        ),
      request.reset,
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

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useMemo, useState, useTransition } from "react"
import { useForm } from "react-hook-form"

import { signIn } from "../actions/sign-in"
import type { SignInResult } from "../actions/sign-in-result"
import { signInWithGoogle } from "../actions/sign-in-with-google"
import { createSignInSchema, type SignInValues } from "../schema/sign-in.schema"

type Method = "email" | "google"

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
  const [isPending, startTransition] = useTransition()
  const [method, setMethod] = useState<Method>("email")
  const [result, setResult] = useState<SignInResult | null>(null)

  function run(nextMethod: Method, request: () => Promise<SignInResult>) {
    setMethod(nextMethod)
    setResult(null)
    startTransition(async () => {
      try {
        setResult(await request())
      } catch {
        setResult({ ok: false, error: "unknown" })
      }
    })
  }

  return {
    control,
    submit: handleSubmit((values) => run("email", () => signIn(values))),
    submitGoogle: () => {
      clearErrors()
      run("google", signInWithGoogle)
    },
    pendingMethod: isPending ? method : null,
    isSuccess: result?.ok === true,
    errorMessage: result?.ok === false ? t(result.error) : undefined,
  }
}

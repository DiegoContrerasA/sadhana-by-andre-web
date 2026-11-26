import { useState, useTransition } from "react"

import type { AuthResult } from "../actions/auth-result"
import { signInWithGoogle } from "../actions/sign-in-with-google"

type Method = "email" | "google"

export function useAuthRequest<TError extends string>() {
  const [isPending, startTransition] = useTransition()
  const [method, setMethod] = useState<Method>("email")
  const [result, setResult] = useState<AuthResult<TError> | null>(null)

  function run(
    nextMethod: Method,
    request: () => Promise<AuthResult<TError>>,
    onError?: (error: TError | "unknown") => void,
  ) {
    setMethod(nextMethod)
    setResult(null)
    startTransition(async () => {
      try {
        const response = await request()
        setResult(response)
        if (!response.ok) onError?.(response.error)
      } catch {
        setResult({ ok: false, error: "unknown" })
      }
    })
  }

  return {
    pendingMethod: isPending ? method : null,
    isSuccess: result?.ok === true,
    error: result?.ok === false ? result.error : null,
    submitEmail: (
      request: () => Promise<AuthResult<TError>>,
      onError?: (error: TError | "unknown") => void,
    ) => run("email", request, onError),
    submitGoogle: () => run("google", signInWithGoogle),
  }
}

import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"

import {
  type UpdateProfileResult,
  updateProfile,
} from "../actions/update-profile"
import {
  createProfileSchema,
  type ProfileValues,
} from "../schema/profile.schema"

type Outcome = "saved" | "invalidInput" | "unknown"

function toOutcome(result: UpdateProfileResult): Outcome {
  return result.ok ? "saved" : result.error
}

export function useProfileForm(defaultValues: ProfileValues) {
  const t = useTranslations("profile.form.errors")
  const [isPending, startTransition] = useTransition()
  const [outcome, setOutcome] = useState<Outcome>()
  const { control, handleSubmit, reset, formState } = useForm<ProfileValues>({
    resolver: zodResolver(createProfileSchema((key) => t(key))),
    defaultValues,
  })

  function save(values: ProfileValues) {
    setOutcome(undefined)
    startTransition(async () => {
      try {
        const next = toOutcome(await updateProfile(values))
        setOutcome(next)
        if (next === "saved") reset(values)
      } catch {
        setOutcome("unknown")
      }
    })
  }

  return {
    control,
    submit: handleSubmit(save, () => setOutcome(undefined)),
    isPending,
    isSaved: outcome === "saved" && !formState.isDirty,
    errorMessage: outcome && outcome !== "saved" ? t(outcome) : undefined,
  }
}

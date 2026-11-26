import { z } from "zod"

import { createPasswordSchema } from "./password.schema"

type PasswordTranslate = Parameters<typeof createPasswordSchema>[0]

type Translate = (
  key: Parameters<PasswordTranslate>[0] | "confirmRequired" | "mismatch",
) => string

export function createResetPasswordSchema(t: Translate) {
  return z
    .object({
      password: createPasswordSchema(t),
      confirmPassword: z.string().min(1, t("confirmRequired")),
    })
    .refine((values) => values.password === values.confirmPassword, {
      message: t("mismatch"),
      path: ["confirmPassword"],
    })
}

export const resetPasswordSchema = createResetPasswordSchema((key) => key)

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

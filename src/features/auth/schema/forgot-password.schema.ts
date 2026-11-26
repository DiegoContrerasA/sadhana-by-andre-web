import { z } from "zod"

import { createEmailSchema } from "./email.schema"

type EmailMessages = Parameters<typeof createEmailSchema>[0]

export function createForgotPasswordSchema(messages: EmailMessages) {
  return z.object({ email: createEmailSchema(messages) })
}

export const forgotPasswordSchema = createForgotPasswordSchema({
  emailRequired: "emailRequired",
  emailInvalid: "emailInvalid",
})

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

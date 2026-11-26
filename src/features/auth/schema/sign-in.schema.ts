import { z } from "zod"

import { createEmailSchema } from "./email.schema"

type SignInSchemaMessages = {
  emailRequired: string
  emailInvalid: string
  passwordRequired: string
}

export function createSignInSchema(messages: SignInSchemaMessages) {
  return z.object({
    email: createEmailSchema(messages),
    password: z.string().min(1, messages.passwordRequired),
  })
}

export const signInSchema = createSignInSchema({
  emailRequired: "emailRequired",
  emailInvalid: "emailInvalid",
  passwordRequired: "passwordRequired",
})

export type SignInValues = z.infer<typeof signInSchema>

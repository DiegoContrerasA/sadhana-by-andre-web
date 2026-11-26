import { z } from "zod"

type SignInSchemaMessages = {
  emailRequired: string
  emailInvalid: string
  passwordRequired: string
}

export function createSignInSchema(messages: SignInSchemaMessages) {
  return z.object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, messages.emailRequired)
      .pipe(z.email(messages.emailInvalid)),
    password: z.string().min(1, messages.passwordRequired),
  })
}

export const signInSchema = createSignInSchema({
  emailRequired: "emailRequired",
  emailInvalid: "emailInvalid",
  passwordRequired: "passwordRequired",
})

export type SignInValues = z.infer<typeof signInSchema>

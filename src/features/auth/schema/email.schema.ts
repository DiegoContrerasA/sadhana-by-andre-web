import { z } from "zod"

type EmailMessages = {
  emailRequired: string
  emailInvalid: string
}

export function createEmailSchema(messages: EmailMessages) {
  return z
    .string()
    .trim()
    .toLowerCase()
    .min(1, messages.emailRequired)
    .pipe(z.email(messages.emailInvalid))
}

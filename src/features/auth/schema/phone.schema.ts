import { z } from "zod"

type PhoneMessages = {
  phoneRequired: string
  phoneInvalid: string
}

export function createPhoneSchema({
  phoneRequired,
  phoneInvalid,
}: PhoneMessages) {
  return z
    .string()
    .trim()
    .min(1, phoneRequired)
    .regex(/^\+?[\d\s()-]+$/, phoneInvalid)
    .transform((value) => value.replace(/[\s()-]/g, ""))
    .pipe(z.string().regex(/^\+?\d{7,15}$/, phoneInvalid))
}

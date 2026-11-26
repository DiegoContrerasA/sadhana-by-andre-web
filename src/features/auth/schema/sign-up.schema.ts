import { z } from "zod"

import { createEmailSchema } from "./email.schema"

type SignUpMessageKey =
  | "firstNameRequired"
  | "firstNameLength"
  | "lastNameRequired"
  | "lastNameLength"
  | "emailRequired"
  | "emailInvalid"
  | "phoneRequired"
  | "phoneInvalid"
  | "passwordRequired"
  | "passwordMin"
  | "passwordMax"
  | "passwordWeak"

type Translate = (key: SignUpMessageKey) => string

function createNameSchema(required: string, length: string) {
  return z.string().trim().min(1, required).min(2, length).max(50, length)
}

export function createSignUpSchema(t: Translate) {
  return z.object({
    firstName: createNameSchema(t("firstNameRequired"), t("firstNameLength")),
    lastName: createNameSchema(t("lastNameRequired"), t("lastNameLength")),
    email: createEmailSchema({
      emailRequired: t("emailRequired"),
      emailInvalid: t("emailInvalid"),
    }),
    phone: z
      .string()
      .trim()
      .min(1, t("phoneRequired"))
      .regex(/^\+?[\d\s()-]+$/, t("phoneInvalid"))
      .transform((value) => value.replace(/[\s()-]/g, ""))
      .pipe(z.string().regex(/^\+?\d{7,15}$/, t("phoneInvalid"))),
    password: z
      .string()
      .min(1, t("passwordRequired"))
      .min(8, t("passwordMin"))
      .max(128, t("passwordMax"))
      .regex(/^(?=.*\p{L})(?=.*\d)/u, t("passwordWeak")),
  })
}

export const signUpSchema = createSignUpSchema((key) => key)

export type SignUpValues = z.infer<typeof signUpSchema>

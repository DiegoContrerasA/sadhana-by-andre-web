import { z } from "zod"

import { createEmailSchema } from "./email.schema"
import { createNameSchema } from "./name.schema"
import { createPasswordSchema } from "./password.schema"
import { createPhoneSchema } from "./phone.schema"

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

export function createSignUpSchema(t: Translate) {
  return z.object({
    firstName: createNameSchema(t("firstNameRequired"), t("firstNameLength")),
    lastName: createNameSchema(t("lastNameRequired"), t("lastNameLength")),
    email: createEmailSchema({
      emailRequired: t("emailRequired"),
      emailInvalid: t("emailInvalid"),
    }),
    phone: createPhoneSchema({
      phoneRequired: t("phoneRequired"),
      phoneInvalid: t("phoneInvalid"),
    }),
    password: createPasswordSchema(t),
  })
}

export const signUpSchema = createSignUpSchema((key) => key)

export type SignUpValues = z.infer<typeof signUpSchema>

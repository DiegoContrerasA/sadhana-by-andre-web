import { z } from "zod"

import { createNameSchema, createPhoneSchema } from "@/features/auth"

type ProfileMessageKey =
  | "firstNameRequired"
  | "firstNameLength"
  | "lastNameRequired"
  | "lastNameLength"
  | "phoneRequired"
  | "phoneInvalid"

export function createProfileSchema(t: (key: ProfileMessageKey) => string) {
  return z.object({
    firstName: createNameSchema(t("firstNameRequired"), t("firstNameLength")),
    lastName: createNameSchema(t("lastNameRequired"), t("lastNameLength")),
    phone: createPhoneSchema({
      phoneRequired: t("phoneRequired"),
      phoneInvalid: t("phoneInvalid"),
    }),
  })
}

export const profileSchema = createProfileSchema((key) => key)

export const accountSchema = profileSchema.extend({ email: z.email() })

export type ProfileValues = z.infer<typeof profileSchema>

export type Account = z.infer<typeof accountSchema>

import { z } from "zod"

type PasswordMessageKey =
  | "passwordRequired"
  | "passwordMin"
  | "passwordMax"
  | "passwordWeak"

export function createPasswordSchema(t: (key: PasswordMessageKey) => string) {
  return z
    .string()
    .min(1, t("passwordRequired"))
    .min(8, t("passwordMin"))
    .max(128, t("passwordMax"))
    .regex(/^(?=.*\p{L})(?=.*\d)/u, t("passwordWeak"))
}

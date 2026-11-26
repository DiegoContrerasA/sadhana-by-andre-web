import "server-only"

import { getMockResetToken } from "./get-mock-reset-token"

export function getMockResetHref(resetPasswordHref: string) {
  return `${resetPasswordHref}?token=${getMockResetToken()}`
}

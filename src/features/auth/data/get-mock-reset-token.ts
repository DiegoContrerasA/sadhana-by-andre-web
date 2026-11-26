import "server-only"

import mockReset from "@/lib/auth/mock-reset-token.json"

export function getMockResetToken() {
  return mockReset.token
}

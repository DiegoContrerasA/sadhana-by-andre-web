import "server-only"

import mockUsers from "@/lib/auth/mock-users.json"

export function isMockEmailTaken(email: string) {
  return mockUsers.some((user) => user.email === email)
}

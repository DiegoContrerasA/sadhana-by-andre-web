import "server-only"

import mockUsers from "@/lib/auth/mock-users.json"

export function getMockAccount(email: string) {
  const user = mockUsers.find((candidate) => candidate.email === email)

  return user ? { email: user.email } : null
}

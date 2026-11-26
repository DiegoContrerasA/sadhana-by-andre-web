import "server-only"

import mockUsers from "@/lib/auth/mock-users.json"

import type { SignInValues } from "../schema/sign-in.schema"

export function getMockUser({ email, password }: SignInValues) {
  const user = mockUsers.find(
    (candidate) => candidate.email === email && candidate.password === password,
  )

  return user ? { email: user.email } : null
}

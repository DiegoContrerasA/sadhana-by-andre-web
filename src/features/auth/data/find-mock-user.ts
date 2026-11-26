import "server-only"

import mockUsers from "@/lib/auth/mock-users.json"

import type { SignInValues } from "../schema/sign-in.schema"

export function findMockUser({ email, password }: SignInValues) {
  return (
    mockUsers.find(
      (user) => user.email === email && user.password === password,
    ) ?? null
  )
}

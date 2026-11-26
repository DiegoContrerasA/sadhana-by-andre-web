export type SignInResult =
  | { ok: true }
  | { ok: false; error: "invalidCredentials" | "unknown" }

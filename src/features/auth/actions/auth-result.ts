export type AuthResult<TError extends string = never> =
  | { ok: true }
  | { ok: false; error: TError | "unknown" }

export const enrollmentCookieName = "sadhana_my_courses"

export const enrollmentCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
} as const

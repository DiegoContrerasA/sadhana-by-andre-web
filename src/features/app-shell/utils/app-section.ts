export const appSections = [
  "courses",
  "myCourses",
  "favorites",
  "profile",
] as const

export type AppSection = (typeof appSections)[number]

export type AppNavItem = {
  section: AppSection
  label: string
  href: string
}

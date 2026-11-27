import type { ReactNode } from "react"

export type CourseAccess = {
  hasAccess: (courseSlug: string) => Promise<boolean>
  renderPanel: (courseSlug: string, lessonCount: number) => ReactNode
  renderUnlockAction: (courseSlug: string) => ReactNode
}

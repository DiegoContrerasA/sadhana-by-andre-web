import { getSectionMetadata, SectionScreen } from "@/features/app-shell/server"

export function generateMetadata() {
  return getSectionMetadata("courses")
}

export default function CoursesPage() {
  return <SectionScreen section="courses" />
}

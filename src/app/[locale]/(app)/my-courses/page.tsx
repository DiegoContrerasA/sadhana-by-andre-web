import { getSectionMetadata, SectionScreen } from "@/features/app-shell/server"

export function generateMetadata() {
  return getSectionMetadata("myCourses")
}

export default function MyCoursesPage() {
  return <SectionScreen section="myCourses" />
}

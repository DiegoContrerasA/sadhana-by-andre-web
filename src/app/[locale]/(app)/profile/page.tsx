import { getSectionMetadata, SectionScreen } from "@/features/app-shell/server"

export function generateMetadata() {
  return getSectionMetadata("profile")
}

export default function ProfilePage() {
  return <SectionScreen section="profile" />
}

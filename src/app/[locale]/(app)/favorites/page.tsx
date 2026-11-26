import { getSectionMetadata, SectionScreen } from "@/features/app-shell/server"

export function generateMetadata() {
  return getSectionMetadata("favorites")
}

export default function FavoritesPage() {
  return <SectionScreen section="favorites" />
}

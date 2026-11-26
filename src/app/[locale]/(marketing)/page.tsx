import { getHomeMetadata, HomeScreen } from "@/features/marketing/server"

const languageHrefs = { es: "/", en: "/en" }

export function generateMetadata() {
  return getHomeMetadata(languageHrefs)
}

export default function HomePage() {
  return <HomeScreen languageHrefs={languageHrefs} />
}

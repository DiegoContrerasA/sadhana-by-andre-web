import { type AppSection, appSections } from "../utils/app-section"
import { AppBrand } from "./app-brand"
import { MainNav } from "./main-nav"
import { ProfileLink } from "./profile-link"
import { TabBar } from "./tab-bar"

type AppNavigationProps = {
  label: string
  homeLabel: string
  labels: Record<AppSection, string>
  hrefs: Record<AppSection, string>
}

export function AppNavigation({
  label,
  homeLabel,
  labels,
  hrefs,
}: AppNavigationProps) {
  const items = appSections.map((section) => ({
    section,
    label: labels[section],
    href: hrefs[section],
  }))
  const profile = items.find((item) => item.section === "profile")

  return (
    <>
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-md">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
          <AppBrand href={hrefs.courses} label={homeLabel} />
          <div className="flex items-center gap-8">
            <MainNav label={label} items={items} />
            {profile ? <ProfileLink item={profile} /> : null}
          </div>
        </div>
      </header>
      <TabBar label={label} items={items} />
    </>
  )
}

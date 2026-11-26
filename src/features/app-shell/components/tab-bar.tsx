import { CompassIcon, HeartIcon, PlayCircleIcon, UserIcon } from "lucide-react"

import { NavLink } from "@/components/nav-link"

import type { AppNavItem, AppSection } from "../utils/app-section"

const icons: Record<AppSection, typeof CompassIcon> = {
  courses: CompassIcon,
  myCourses: PlayCircleIcon,
  favorites: HeartIcon,
  profile: UserIcon,
}

type TabBarProps = {
  label: string
  items: AppNavItem[]
}

export function TabBar({ label, items }: TabBarProps) {
  return (
    <nav
      aria-label={label}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-4">
        {items.map((item) => {
          const Icon = icons[item.section]

          return (
            <li key={item.section}>
              <NavLink
                href={item.href}
                className="flex h-16 flex-col items-center justify-center gap-1 text-[11px] text-muted-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset aria-[current=page]:font-medium aria-[current=page]:text-primary"
              >
                <Icon aria-hidden="true" className="size-5" />
                {item.label}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

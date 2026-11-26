import { NavLink } from "@/components/nav-link"

import type { AppNavItem } from "../utils/app-section"

type MainNavProps = {
  label: string
  items: AppNavItem[]
}

export function MainNav({ label, items }: MainNavProps) {
  return (
    <nav aria-label={label} className="hidden md:block">
      <ul className="flex items-center gap-8">
        {items
          .filter((item) => item.section !== "profile")
          .map((item) => (
            <li key={item.section}>
              <NavLink
                href={item.href}
                className="relative block py-2 text-xs tracking-[0.22em] text-overlay-foreground/80 uppercase transition-colors outline-none hover:text-overlay-foreground focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-overlay-foreground/60 aria-[current=page]:text-overlay-foreground aria-[current=page]:after:absolute aria-[current=page]:after:right-[0.22em] aria-[current=page]:after:bottom-0 aria-[current=page]:after:left-0 aria-[current=page]:after:h-px aria-[current=page]:after:bg-overlay-foreground"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
      </ul>
    </nav>
  )
}

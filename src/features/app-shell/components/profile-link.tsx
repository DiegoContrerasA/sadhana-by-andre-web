import { UserIcon } from "lucide-react"

import { NavLink } from "@/components/nav-link"

import type { AppNavItem } from "../utils/app-section"

type ProfileLinkProps = {
  item: AppNavItem
}

export function ProfileLink({ item }: ProfileLinkProps) {
  return (
    <NavLink
      href={item.href}
      className="hidden h-10 items-center gap-2 rounded-lg border border-overlay-foreground/50 px-4 text-xs tracking-[0.2em] text-overlay-foreground uppercase transition-colors outline-none hover:bg-overlay-foreground/10 focus-visible:ring-3 focus-visible:ring-overlay-foreground/60 aria-[current=page]:border-overlay-foreground aria-[current=page]:bg-overlay-foreground aria-[current=page]:text-primary md:flex"
    >
      <UserIcon aria-hidden="true" className="size-4" />
      {item.label}
    </NavLink>
  )
}

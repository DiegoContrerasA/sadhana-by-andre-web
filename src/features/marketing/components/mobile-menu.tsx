"use client"

import { MenuIcon, XIcon } from "lucide-react"
import type { Messages } from "next-intl"
import { type ReactNode, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

type MobileMenuProps = {
  nav: Messages["nav"]
  children: ReactNode
}

export function MobileMenu({ nav, children }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        aria-label={nav.openMenu}
        render={<Button variant="ghost-inverse" size="icon" />}
      >
        <MenuIcon aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side="full"
        showCloseButton={false}
        className="bg-primary px-8"
      >
        <SheetTitle className="sr-only">{nav.ariaNavMobile}</SheetTitle>
        <div className="flex h-20 items-center justify-between">
          {children}
          <SheetClose
            aria-label={nav.closeMenu}
            render={<Button variant="ghost-inverse" size="icon" />}
          >
            <XIcon aria-hidden="true" />
          </SheetClose>
        </div>
        <ul className="flex flex-1 flex-col items-center justify-center gap-10 pb-12">
          {nav.links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={() => setIsOpen(false)}
                className="text-2xl font-light text-overlay-foreground/80 uppercase hover:text-overlay-foreground"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}

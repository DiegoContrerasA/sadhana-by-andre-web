"use client"

import type { ComponentProps } from "react"

import { Link, usePathname } from "@/i18n/navigation"

type NavLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string
}

export function NavLink({ href, ...props }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link href={href} aria-current={isActive ? "page" : undefined} {...props} />
  )
}

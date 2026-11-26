"use client"

import type { ReactNode } from "react"

import { useIsScrolled } from "../hooks/use-is-scrolled"

const solidAfterPixels = 100

type NavBarProps = {
  children: ReactNode
}

export function NavBar({ children }: NavBarProps) {
  const isScrolled = useIsScrolled(solidAfterPixels)

  return (
    <div
      data-scrolled={isScrolled}
      className="fixed inset-x-0 top-0 z-40 flex h-20 items-center justify-between px-8 transition-[background-color,box-shadow] duration-300 data-[scrolled=false]:md:backdrop-blur-sm data-[scrolled=true]:bg-primary data-[scrolled=true]:shadow-md motion-reduce:transition-none md:justify-center"
    >
      {children}
    </div>
  )
}

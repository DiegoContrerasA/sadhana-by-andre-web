import Image from "next/image"

import { Link } from "@/i18n/navigation"

type AppBrandProps = {
  href: string
  label: string
}

export function AppBrand({ href, label }: AppBrandProps) {
  return (
    <Link
      href={href}
      className="rounded-sm outline-none focus-visible:ring-3 focus-visible:ring-overlay-foreground/60"
    >
      <Image
        src="/brand/logo-white.png"
        alt={label}
        width={1220}
        height={204}
        sizes="144px"
        preload
        className="h-auto w-32 md:w-36"
      />
    </Link>
  )
}

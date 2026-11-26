import Image from "next/image"
import Link from "next/link"

type AuthBrandProps = {
  homeHref: string
  homeLabel: string
}

export function AuthBrand({ homeHref, homeLabel }: AuthBrandProps) {
  return (
    <Link
      href={homeHref}
      aria-label={homeLabel}
      className="w-fit rounded-lg bg-primary px-4 py-3 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <Image
        src="/brand/logo-white.png"
        alt=""
        width={1220}
        height={204}
        sizes="144px"
        preload
        className="h-auto w-36"
      />
    </Link>
  )
}

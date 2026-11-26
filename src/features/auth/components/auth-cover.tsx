import Image from "next/image"

import coverImage from "../assets/auth-cover.jpeg"

export function AuthCover() {
  return (
    <div
      aria-hidden="true"
      className="hidden lg:sticky lg:top-0 lg:block lg:h-dvh"
    >
      <div className="relative h-full overflow-hidden">
        <Image
          src={coverImage}
          alt=""
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 60vw, 1px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/35" />
        <div className="absolute inset-0 bg-linear-to-t from-overlay/50 via-transparent to-transparent" />
      </div>
    </div>
  )
}

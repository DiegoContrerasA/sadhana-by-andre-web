import { MaximizeIcon } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"

import type { GalleryPhoto } from "./gallery-grid"

const patternLength = 10
const featuredPosition = 0
const widePositions = [3, 6, 9]

type GalleryThumbnailProps = {
  photo: GalleryPhoto
  position: number
  onOpen: () => void
}

export function GalleryThumbnail({
  photo,
  position,
  onOpen,
}: GalleryThumbnailProps) {
  const slot = position % patternLength

  return (
    <li
      className={cn(
        slot === featuredPosition && "col-span-2 md:row-span-2",
        widePositions.includes(slot) && "col-span-2",
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        className="group relative block size-full cursor-zoom-in overflow-hidden focus-visible:ring-3 focus-visible:ring-ring"
      >
        <Image
          src={photo.image}
          alt={photo.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover grayscale-[15%] transition duration-700 group-hover:scale-105 group-hover:brightness-75 group-hover:grayscale-0 motion-reduce:transition-none"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-secondary/80 text-primary">
            <MaximizeIcon className="size-4" />
          </span>
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-grain opacity-5 mix-blend-overlay"
        />
      </button>
    </li>
  )
}

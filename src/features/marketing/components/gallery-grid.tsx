"use client"

import dynamic from "next/dynamic"
import type { StaticImageData } from "next/image"
import { useState } from "react"

import { GalleryThumbnail } from "./gallery-thumbnail"

const GalleryLightbox = dynamic(() =>
  import("./gallery-lightbox").then((module) => module.GalleryLightbox),
)

export type GalleryPhoto = {
  image: StaticImageData
  alt: string
}

type GalleryGridProps = {
  photos: GalleryPhoto[]
}

export function GalleryGrid({ photos }: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <>
      <ul className="grid auto-rows-[200px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {photos.map((photo, index) => (
          <GalleryThumbnail
            key={photo.alt}
            photo={photo}
            position={index}
            onOpen={() => setOpenIndex(index)}
          />
        ))}
      </ul>
      {openIndex === null ? null : (
        <GalleryLightbox
          photos={photos}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </>
  )
}

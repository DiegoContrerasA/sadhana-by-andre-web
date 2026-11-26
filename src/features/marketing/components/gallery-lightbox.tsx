"use client"

import Lightbox from "yet-another-react-lightbox"
import Zoom from "yet-another-react-lightbox/plugins/zoom"

import "yet-another-react-lightbox/styles.css"

import type { GalleryPhoto } from "./gallery-grid"

type GalleryLightboxProps = {
  photos: GalleryPhoto[]
  index: number
  onClose: () => void
}

export function GalleryLightbox({
  photos,
  index,
  onClose,
}: GalleryLightboxProps) {
  const slides = photos.map(({ image, alt }) => ({
    src: image.src,
    width: image.width,
    height: image.height,
    alt,
  }))

  return (
    <Lightbox
      open
      close={onClose}
      index={index}
      slides={slides}
      plugins={[Zoom]}
    />
  )
}

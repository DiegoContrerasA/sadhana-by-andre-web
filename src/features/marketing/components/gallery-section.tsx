import type { Messages } from "next-intl"
import { useTranslations } from "next-intl"

import { galleryPhotos } from "../utils/gallery-photos"
import { GalleryGrid } from "./gallery-grid"
import { SectionHeader } from "./section-header"

type GallerySectionProps = {
  gallery: Messages["gallery"]
}

export function GallerySection({ gallery }: GallerySectionProps) {
  const t = useTranslations("gallery")
  const photos = galleryPhotos.map((image, index) => ({
    image,
    alt: t("imgAlt", { number: String(index + 1) }),
  }))

  return (
    <section id="galeria" className="bg-secondary px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label={gallery.label}
          heading={gallery.heading}
          headingEm={gallery.headingEm}
          isStacked
        />
        <p className="mx-auto mt-6 mb-16 max-w-lg text-center leading-relaxed text-muted-foreground">
          {gallery.body}
        </p>
        <GalleryGrid photos={photos} />
      </div>
    </section>
  )
}

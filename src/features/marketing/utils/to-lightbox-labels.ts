import type { Messages } from "next-intl"

export function toLightboxLabels(viewer: Messages["gallery"]["viewer"]) {
  return {
    Previous: viewer.previous,
    Next: viewer.next,
    Close: viewer.close,
    "Zoom in": viewer.zoomIn,
    "Zoom out": viewer.zoomOut,
    Slide: viewer.slide,
    Carousel: viewer.carousel,
    Lightbox: viewer.lightbox,
    "Photo gallery": viewer.photoGallery,
    "{index} of {total}": viewer.position,
  }
}

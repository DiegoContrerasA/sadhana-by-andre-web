import { getImageProps } from "next/image"
import { preload } from "react-dom"

import desktopImage from "../assets/hero.webp"
import mobileImage from "../assets/hero-mobile.webp"

const shared = { alt: "", sizes: "100vw" }

export function HeroBackground() {
  const { props: desktop } = getImageProps({ ...shared, src: desktopImage })
  const { props: mobile } = getImageProps({ ...shared, src: mobileImage })

  preload(mobile.src, {
    as: "image",
    imageSrcSet: mobile.srcSet,
    imageSizes: shared.sizes,
    media: "(max-width: 767px)",
    fetchPriority: "high",
  })
  preload(desktop.src, {
    as: "image",
    imageSrcSet: desktop.srcSet,
    imageSizes: shared.sizes,
    media: "(min-width: 768px)",
    fetchPriority: "high",
  })

  return (
    <>
      <picture>
        <source
          media="(min-width: 768px)"
          srcSet={desktop.srcSet}
          sizes={shared.sizes}
        />
        <img
          {...mobile}
          alt=""
          fetchPriority="high"
          loading="eager"
          className="absolute inset-0 size-full object-cover object-top md:object-center"
        />
      </picture>
      <div aria-hidden="true" className="absolute inset-0 bg-overlay/40" />
    </>
  )
}

import type { MetadataRoute } from "next"

import { siteName } from "@/constants/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: "Sadhana",
    icons: [192, 512].map((size) => ({
      src: `/icons/android-chrome-${size}x${size}.png`,
      sizes: `${size}x${size}`,
      type: "image/png",
    })),
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  }
}

"use client"

import { usePauseOnHide } from "../hooks/use-pause-on-hide"

type LessonVideoProps = {
  label: string
  src: string
  posterUrl: string
  captionsUrl: string
  captionsLocale: string
  captionsLabel: string
}

export function LessonVideo({
  label,
  src,
  posterUrl,
  captionsUrl,
  captionsLocale,
  captionsLabel,
}: LessonVideoProps) {
  const videoRef = usePauseOnHide()

  return (
    <video
      ref={videoRef}
      aria-label={label}
      src={src}
      poster={posterUrl}
      controls
      playsInline
      preload="metadata"
      className="aspect-video w-full rounded-xl bg-overlay"
    >
      <track
        kind="captions"
        src={captionsUrl}
        srcLang={captionsLocale}
        label={captionsLabel}
      />
    </video>
  )
}

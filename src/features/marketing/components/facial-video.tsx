"use client"

import { PlayIcon } from "lucide-react"
import { type MouseEvent, useState } from "react"

type FacialVideoProps = {
  playLabel: string
  pauseLabel: string
}

export function FacialVideo({ playLabel, pauseLabel }: FacialVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  function handleToggle(event: MouseEvent<HTMLButtonElement>) {
    const video = event.currentTarget.previousElementSibling
    if (!(video instanceof HTMLVideoElement)) return
    if (video.paused) {
      video.play()
      return
    }
    video.pause()
  }

  return (
    <div className="relative aspect-3/4 overflow-hidden">
      {/* biome-ignore lint/a11y/useMediaCaption: the source video has no caption track */}
      <video
        src="/videos/facial.mp4"
        poster="/videos/facial-poster.jpg"
        playsInline
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="size-full object-cover"
      />
      <button
        type="button"
        onClick={handleToggle}
        aria-label={isPlaying ? pauseLabel : playLabel}
        className="group absolute inset-0 flex cursor-pointer items-center justify-center outline-none"
      >
        {isPlaying ? null : (
          <span className="flex size-16 items-center justify-center rounded-full bg-primary/80 text-primary-foreground backdrop-blur-sm group-focus-visible:ring-3 group-focus-visible:ring-ring">
            <PlayIcon aria-hidden="true" className="fill-current" />
          </span>
        )}
      </button>
    </div>
  )
}

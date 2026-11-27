"use client"

import { useLayoutEffect, useRef } from "react"

export function usePauseOnHide() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useLayoutEffect(() => {
    const video = videoRef.current

    return () => video?.pause()
  }, [])

  return videoRef
}

"use client"

import { useEffect, useRef, useState } from "react"

const pageSize = 9
const preloadMargin = "0px 0px 600px"

export function useInfiniteReveal(total: number) {
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const hasMore = visibleCount < total

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisibleCount(visibleCount + pageSize)
      },
      { rootMargin: preloadMargin },
    )
    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [visibleCount, hasMore])

  function showMore() {
    setVisibleCount(visibleCount + pageSize)
  }

  return { visibleCount, hasMore, sentinelRef, showMore }
}

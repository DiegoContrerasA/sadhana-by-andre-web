import { LockIcon } from "lucide-react"
import type { ReactNode } from "react"

import { CourseCover } from "./course-cover"

const coverSizes = "(min-width: 1024px) 752px, 100vw"

type LockedLessonProps = {
  title: string
  imageUrl?: string
  children: ReactNode
}

export function LockedLesson({ title, imageUrl, children }: LockedLessonProps) {
  return (
    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-primary text-overlay-foreground">
      {imageUrl ? (
        <>
          <CourseCover imageUrl={imageUrl} sizes={coverSizes} />
          <div className="absolute inset-0 bg-overlay/75" />
        </>
      ) : null}
      <div className="relative flex flex-col items-center gap-2 px-4 text-center sm:gap-4">
        <LockIcon aria-hidden="true" className="size-6 sm:size-8" />
        <p className="text-sm text-balance sm:text-lg">{title}</p>
        {children}
      </div>
    </div>
  )
}

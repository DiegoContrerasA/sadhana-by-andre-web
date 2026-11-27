import { Flower2Icon } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"

type CourseCoverProps = {
  imageUrl?: string
  sizes: string
  isEager?: boolean
  className?: string
}

export function CourseCover({
  imageUrl,
  sizes,
  isEager = false,
  className,
}: CourseCoverProps) {
  if (!imageUrl) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-primary">
        <Flower2Icon
          aria-hidden="true"
          strokeWidth={1}
          className="size-14 text-primary-foreground/40"
        />
      </div>
    )
  }

  return (
    <Image
      src={imageUrl}
      alt=""
      fill
      sizes={sizes}
      loading={isEager ? "eager" : "lazy"}
      className={cn("object-cover", className)}
    />
  )
}

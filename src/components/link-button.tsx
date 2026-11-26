import type { VariantProps } from "class-variance-authority"
import Link from "next/link"
import type { ComponentProps } from "react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type LinkButtonProps = ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants> & {
    isExternal?: boolean
  }

export function LinkButton({
  variant,
  size = "lg",
  isExternal = false,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      {...props}
    />
  )
}

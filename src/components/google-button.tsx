import { Loader2Icon } from "lucide-react"
import Image from "next/image"
import type { ComponentProps } from "react"

import { Button } from "@/components/ui/button"

type GoogleButtonProps = {
  isPending: boolean
  pendingLabel: string
} & Omit<ComponentProps<typeof Button>, "type">

export function GoogleButton({
  isPending,
  pendingLabel,
  disabled,
  children,
  ...buttonProps
}: GoogleButtonProps) {
  return (
    <Button
      variant="outline"
      size="lg"
      {...buttonProps}
      type="button"
      disabled={disabled || isPending}
      aria-busy={isPending}
    >
      {isPending ? (
        <Loader2Icon
          aria-hidden="true"
          className="animate-spin motion-reduce:animate-none"
        />
      ) : (
        <Image src="/brand/google.svg" alt="" width={18} height={18} />
      )}
      {isPending ? pendingLabel : children}
    </Button>
  )
}

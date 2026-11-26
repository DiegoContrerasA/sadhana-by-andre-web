import { Loader2Icon } from "lucide-react"
import type { ComponentProps } from "react"

import { Button } from "@/components/ui/button"

type SubmitButtonProps = {
  isPending: boolean
  pendingLabel: string
} & Omit<ComponentProps<typeof Button>, "type">

export function SubmitButton({
  isPending,
  pendingLabel,
  children,
  disabled,
  ...buttonProps
}: SubmitButtonProps) {
  return (
    <Button
      {...buttonProps}
      type="submit"
      disabled={disabled || isPending}
      aria-busy={isPending}
    >
      {isPending ? (
        <>
          <Loader2Icon
            className="animate-spin motion-reduce:animate-none"
            data-icon="inline-start"
            aria-hidden
          />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  )
}

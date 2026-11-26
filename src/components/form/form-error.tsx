import { CircleAlertIcon } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { focusElement } from "@/utils/focus-element"

type FormErrorProps = {
  message?: string
  shouldFocus?: boolean
}

export function FormError({ message, shouldFocus = false }: FormErrorProps) {
  if (!message) {
    return null
  }

  return (
    <Alert
      ref={shouldFocus ? focusElement : undefined}
      tabIndex={shouldFocus ? -1 : undefined}
      variant="destructive"
    >
      <CircleAlertIcon aria-hidden />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

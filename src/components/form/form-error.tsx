import { CircleAlertIcon } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"

type FormErrorProps = {
  message?: string
}

export function FormError({ message }: FormErrorProps) {
  if (!message) {
    return null
  }

  return (
    <Alert variant="destructive">
      <CircleAlertIcon aria-hidden />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

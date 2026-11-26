import { CircleCheckIcon } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"

type FormSuccessProps = {
  message?: string
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) {
    return null
  }

  return (
    <Alert role="status">
      <CircleCheckIcon aria-hidden />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

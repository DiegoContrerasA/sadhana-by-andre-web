import { CircleCheckIcon } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"

type FormSuccessProps = {
  message?: string
}

export function FormSuccess({ message }: FormSuccessProps) {
  return (
    <>
      <p role="status" className="sr-only">
        {message}
      </p>
      {message ? (
        <Alert role="presentation" aria-hidden="true">
          <CircleCheckIcon aria-hidden />
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}
    </>
  )
}

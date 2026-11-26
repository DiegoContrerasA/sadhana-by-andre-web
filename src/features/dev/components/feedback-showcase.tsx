import { InfoIcon } from "lucide-react"

import { FormError } from "@/components/form/form-error"
import { FormSuccess } from "@/components/form/form-success"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { ShowcaseSection } from "./showcase-section"

export function FeedbackShowcase() {
  return (
    <ShowcaseSection
      title="Mensajes"
      description="Alert por defecto, destructivo y el error general de un formulario."
    >
      <Alert>
        <InfoIcon aria-hidden />
        <AlertTitle>Revisa tu correo</AlertTitle>
        <AlertDescription>
          Si el correo está registrado, te enviamos un enlace.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <InfoIcon aria-hidden />
        <AlertTitle>No pudimos continuar</AlertTitle>
        <AlertDescription>Intenta de nuevo en un momento.</AlertDescription>
      </Alert>
      <FormError message="Correo o contraseña incorrectos" />
      <FormSuccess message="Cambios guardados" />
    </ShowcaseSection>
  )
}

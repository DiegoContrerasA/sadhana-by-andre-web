import { EditEmailDialog } from "./edit-email-dialog"
import { ShowcaseSection } from "./showcase-section"
import { SignOutAlertDialog } from "./sign-out-alert-dialog"

export function ModalsShowcase() {
  return (
    <ShowcaseSection
      title="Modales"
      description="Dialog con formulario y AlertDialog de confirmación. Se cierran con Esc, el botón o fuera del modal."
    >
      <div className="flex flex-wrap items-center gap-3">
        <EditEmailDialog />
        <SignOutAlertDialog />
      </div>
    </ShowcaseSection>
  )
}

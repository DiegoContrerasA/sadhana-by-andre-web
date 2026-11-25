import { ButtonsShowcase } from "../components/buttons-showcase"
import { FeedbackShowcase } from "../components/feedback-showcase"
import { FieldsShowcase } from "../components/fields-showcase"
import { ModalsShowcase } from "../components/modals-showcase"
import { TypographyShowcase } from "../components/typography-showcase"

export function ComponentsScreen() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 p-6">
      <h1 className="font-heading text-5xl">Componentes base</h1>
      <TypographyShowcase />
      <ButtonsShowcase />
      <FieldsShowcase />
      <FeedbackShowcase />
      <ModalsShowcase />
    </main>
  )
}

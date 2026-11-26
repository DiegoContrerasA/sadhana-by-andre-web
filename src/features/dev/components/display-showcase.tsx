import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

import { ShowcaseSection } from "./showcase-section"

const variants = ["default", "secondary", "outline", "soft"] as const

const sizes = ["default", "lg", "label"] as const

export function DisplayShowcase() {
  return (
    <ShowcaseSection title="Etiquetas y acordeón">
      <div className="flex flex-wrap items-center gap-3">
        {variants.map((variant) => (
          <Badge key={variant} variant={variant}>
            {variant}
          </Badge>
        ))}
        {sizes.map((size) => (
          <Badge key={size} size={size}>
            {size}
          </Badge>
        ))}
      </div>
      <Accordion>
        <AccordionItem value="example">
          <AccordionTrigger>Pregunta de ejemplo</AccordionTrigger>
          <AccordionContent>Respuesta de ejemplo.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </ShowcaseSection>
  )
}

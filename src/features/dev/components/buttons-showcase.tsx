import { ArrowRightIcon, PlusIcon } from "lucide-react"

import { SubmitButton } from "@/components/form/submit-button"
import { Button } from "@/components/ui/button"

import { ShowcaseSection } from "./showcase-section"

const variants = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "destructive",
  "link",
] as const

const sizes = ["xs", "sm", "default", "lg"] as const

export function ButtonsShowcase() {
  return (
    <ShowcaseSection
      title="Botones"
      description="Variantes, tamaños (default 40px, lg 52px), deshabilitado y cargando."
    >
      <div className="flex flex-wrap items-center gap-3">
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {sizes.map((size) => (
          <Button key={size} size={size}>
            {size}
          </Button>
        ))}
        <Button size="icon" aria-label="Agregar">
          <PlusIcon />
        </Button>
        <Button>
          Con ícono
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
        <Button disabled>Deshabilitado</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton size="lg" isPending={false} pendingLabel="Enviando…">
          Enviar
        </SubmitButton>
        <SubmitButton size="lg" isPending pendingLabel="Enviando…">
          Enviar
        </SubmitButton>
      </div>
    </ShowcaseSection>
  )
}

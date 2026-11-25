import type { LucideIcon } from "lucide-react"

import { InputGroupAddon } from "@/components/ui/input-group"

type FieldIconAddonProps = {
  icon: LucideIcon
}

export function FieldIconAddon({ icon: Icon }: FieldIconAddonProps) {
  return (
    <InputGroupAddon align="inline-start" className="gap-3">
      <Icon aria-hidden />
      <span aria-hidden className="h-5 w-px bg-border" />
    </InputGroupAddon>
  )
}

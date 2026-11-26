import { cn } from "@/lib/utils"

type SectionDividerProps = {
  className?: string
}

export function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-16 w-px bg-primary/25", className)}
    />
  )
}

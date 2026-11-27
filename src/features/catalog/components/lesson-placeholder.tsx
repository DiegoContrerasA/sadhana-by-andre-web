import { cn } from "@/lib/utils"

export function LessonPlaceholder({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "w-full animate-pulse rounded-xl bg-primary/10 motion-reduce:animate-none",
        className,
      )}
    />
  )
}

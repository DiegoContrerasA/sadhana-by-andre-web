import { cva } from "class-variance-authority"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"

const pagerLink = cva(
  "flex min-w-0 max-w-[48%] items-center gap-2 rounded-xl border px-3 py-3 sm:gap-3 sm:px-4 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring",
  {
    variants: {
      direction: {
        previous:
          "mr-auto border-primary/20 bg-background text-primary hover:border-primary/60",
        next: "ml-auto flex-row-reverse border-primary bg-primary text-right text-primary-foreground hover:bg-primary/90",
      },
    },
  },
)

const icons = { previous: ArrowLeftIcon, next: ArrowRightIcon }

type LessonPagerLinkProps = {
  direction: keyof typeof icons
  href: string
  label: string
  title: string
}

export function LessonPagerLink({
  direction,
  href,
  label,
  title,
}: LessonPagerLinkProps) {
  const Icon = icons[direction]

  return (
    <Link href={href} className={pagerLink({ direction })}>
      <Icon aria-hidden="true" className="size-4 shrink-0" />
      <span className="flex min-w-0 flex-col">
        <span className="text-[0.65rem] tracking-widest whitespace-nowrap uppercase opacity-80 sm:tracking-[0.2em]">
          {label}
        </span>
        <span className="truncate text-sm">{title}</span>
      </span>
    </Link>
  )
}

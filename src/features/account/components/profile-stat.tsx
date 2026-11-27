import Link from "next/link"

type ProfileStatProps = {
  value: number
  label: string
  href: string
}

export function ProfileStat({ value, label, href }: ProfileStatProps) {
  return (
    <Link
      href={href}
      className="flex flex-1 flex-col items-center gap-1 rounded-lg bg-accent/40 px-3 py-4 text-center transition-colors outline-none hover:bg-accent/70 focus-visible:ring-3 focus-visible:ring-ring"
    >
      <span className="text-2xl text-primary">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </Link>
  )
}

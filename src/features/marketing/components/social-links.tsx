import { ArrowUpRightIcon } from "lucide-react"

type SocialLinksProps = {
  socials: ReadonlyArray<{ label: string; href: string }>
}

export function SocialLinks({ socials }: SocialLinksProps) {
  return (
    <ul className="flex flex-col divide-y divide-overlay-foreground/10">
      {socials.map(({ label, href }) => (
        <li key={href}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-5 text-2xl font-light tracking-wide text-overlay-foreground/60 transition-colors duration-300 hover:text-overlay-foreground md:text-3xl"
          >
            {label}
            <ArrowUpRightIcon
              aria-hidden="true"
              className="size-4 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </a>
        </li>
      ))}
    </ul>
  )
}

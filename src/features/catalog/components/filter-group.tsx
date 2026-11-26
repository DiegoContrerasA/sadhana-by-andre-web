import { LinkButton } from "@/components/link-button"

export type FilterOption = {
  key: string
  label: string
  href: string
  isSelected: boolean
}

type FilterGroupProps = {
  label: string
  options: FilterOption[]
}

export function FilterGroup({ label, options }: FilterGroupProps) {
  return (
    <nav aria-label={label}>
      <ul className="-mx-1 flex gap-2 overflow-x-auto p-1 sm:flex-wrap">
        {options.map((option) => (
          <li key={option.key} className="shrink-0">
            <LinkButton
              href={option.href}
              scroll={false}
              size="sm"
              variant={option.isSelected ? "default" : "outline"}
              aria-current={option.isSelected ? "true" : undefined}
              className="h-9 rounded-full px-4"
            >
              {option.label}
            </LinkButton>
          </li>
        ))}
      </ul>
    </nav>
  )
}

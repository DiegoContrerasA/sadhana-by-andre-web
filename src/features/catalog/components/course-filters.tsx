import type { Messages } from "next-intl"

import { LinkButton } from "@/components/link-button"

import type { CourseFilters as CourseFiltersValues } from "../schema/course-filters.schema"
import { toLevelOptions } from "../utils/to-level-options"
import { CourseSearch } from "./course-search"
import { FilterGroup } from "./filter-group"

type CourseFiltersProps = {
  copy: Messages["catalog"]
  basePath: string
  filters: CourseFiltersValues
}

export function CourseFilters({ copy, basePath, filters }: CourseFiltersProps) {
  const hasFilters = Object.values(filters).some(Boolean)

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-primary/15 bg-background p-4 sm:p-6">
      <CourseSearch copy={copy.search} basePath={basePath} filters={filters} />
      <FilterGroup
        label={copy.levels.label}
        options={toLevelOptions({ labels: copy.levels, filters, basePath })}
      />
      {hasFilters ? (
        <LinkButton
          href={basePath}
          scroll={false}
          variant="link"
          size="sm"
          className="self-start px-0"
        >
          {copy.clear}
        </LinkButton>
      ) : null}
    </div>
  )
}

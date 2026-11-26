import type { Messages } from "next-intl"

import {
  type CourseFilters,
  courseLevels,
} from "../schema/course-filters.schema"
import { buildFiltersHref } from "./build-filters-href"

type LevelOptionsInput = {
  labels: Messages["catalog"]["levels"]
  filters: CourseFilters
  basePath: string
}

export function toLevelOptions({
  labels,
  filters,
  basePath,
}: LevelOptionsInput) {
  return [undefined, ...courseLevels].map((level) => ({
    key: level ?? "all",
    label: labels[level ?? "all"],
    href: buildFiltersHref(basePath, { ...filters, level }),
    isSelected: filters.level === level,
  }))
}

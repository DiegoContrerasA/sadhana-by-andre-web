import { SearchIcon } from "lucide-react"
import Form from "next/form"
import type { Messages } from "next-intl"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

import type { CourseFilters } from "../schema/course-filters.schema"

type CourseSearchProps = {
  copy: Messages["catalog"]["search"]
  basePath: string
  filters: CourseFilters
}

export function CourseSearch({ copy, basePath, filters }: CourseSearchProps) {
  const { q, level } = filters

  return (
    <Form action={basePath} scroll={false} role="search">
      {level ? <input type="hidden" name="level" value={level} /> : null}
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <SearchIcon aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          key={q ?? ""}
          type="search"
          name="q"
          defaultValue={q}
          maxLength={80}
          aria-label={copy.label}
          placeholder={copy.placeholder}
          autoComplete="off"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton type="submit" variant="default" size="sm">
            {copy.submit}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Form>
  )
}

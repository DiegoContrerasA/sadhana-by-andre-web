"use client"

import type { LucideIcon } from "lucide-react"
import { type ComponentProps, useId } from "react"
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form"

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"

import { FieldIconAddon } from "./field-icon-addon"

type TextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  label: string
  description?: string
  icon?: LucideIcon
} & Omit<ComponentProps<"input">, "name" | "value" | "defaultValue" | "id">

export function TextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  icon,
  ...inputProps
}: TextFieldProps<TFieldValues>) {
  const id = useId()
  const { field, fieldState } = useController({ control, name })
  const isInvalid = fieldState.invalid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <InputGroup>
        {icon ? <FieldIconAddon icon={icon} /> : null}
        <InputGroupInput
          {...inputProps}
          {...field}
          id={id}
          value={field.value ?? ""}
          aria-invalid={isInvalid}
        />
      </InputGroup>
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      {isInvalid ? <FieldError errors={[fieldState.error]} /> : null}
    </Field>
  )
}

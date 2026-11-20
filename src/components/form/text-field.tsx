"use client"

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
import { Input } from "@/components/ui/input"

type TextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  label: string
  description?: string
} & Omit<ComponentProps<typeof Input>, "name" | "value" | "defaultValue" | "id">

export function TextField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  ...inputProps
}: TextFieldProps<TFieldValues>) {
  const id = useId()
  const { field, fieldState } = useController({ control, name })
  const isInvalid = fieldState.invalid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        {...inputProps}
        {...field}
        id={id}
        value={field.value ?? ""}
        aria-invalid={isInvalid}
      />
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      {isInvalid ? <FieldError errors={[fieldState.error]} /> : null}
    </Field>
  )
}

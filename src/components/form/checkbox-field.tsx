"use client"

import { useId } from "react"
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"

type CheckboxFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  label: string
}

export function CheckboxField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
}: CheckboxFieldProps<TFieldValues>) {
  const id = useId()
  const {
    field: { value, onChange, ...field },
    fieldState,
  } = useController({ control, name })
  const isInvalid = fieldState.invalid

  return (
    <Field orientation="horizontal" data-invalid={isInvalid}>
      <Checkbox
        id={id}
        {...field}
        checked={value === true}
        onCheckedChange={onChange}
        aria-invalid={isInvalid}
      />
      <FieldContent>
        <FieldLabel htmlFor={id} className="font-normal">
          {label}
        </FieldLabel>
        {isInvalid ? <FieldError errors={[fieldState.error]} /> : null}
      </FieldContent>
    </Field>
  )
}

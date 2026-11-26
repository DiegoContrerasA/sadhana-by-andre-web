"use client"

import { EyeIcon, EyeOffIcon, LockKeyholeIcon } from "lucide-react"
import { useId, useState } from "react"
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { FieldIconAddon } from "./field-icon-addon"

type PasswordFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  label: string
  autoComplete: "current-password" | "new-password"
  description?: string
  placeholder?: string
  showLabel?: string
  hideLabel?: string
}

export function PasswordField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  autoComplete,
  description,
  placeholder,
  showLabel = "Mostrar contraseña",
  hideLabel = "Ocultar contraseña",
}: PasswordFieldProps<TFieldValues>) {
  const id = useId()
  const [isVisible, setIsVisible] = useState(false)
  const { field, fieldState } = useController({ control, name })
  const isInvalid = fieldState.invalid

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <InputGroup>
        <FieldIconAddon icon={LockKeyholeIcon} />
        <InputGroupInput
          {...field}
          id={id}
          type={isVisible ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={isInvalid}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            type="button"
            size="icon-xs"
            aria-label={isVisible ? hideLabel : showLabel}
            aria-pressed={isVisible}
            onClick={() => setIsVisible((current) => !current)}
          >
            {isVisible ? <EyeOffIcon /> : <EyeIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {description ? <FieldDescription>{description}</FieldDescription> : null}
      {isInvalid ? <FieldError errors={[fieldState.error]} /> : null}
    </Field>
  )
}

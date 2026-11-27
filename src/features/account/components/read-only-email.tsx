"use client"

import { MailIcon } from "lucide-react"
import { useId } from "react"

import { FieldIconAddon } from "@/components/form/field-icon-addon"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"

type ReadOnlyEmailProps = {
  label: string
  description: string
  email: string
}

export function ReadOnlyEmail({
  label,
  description,
  email,
}: ReadOnlyEmailProps) {
  const id = useId()

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <InputGroup className="bg-muted">
        <FieldIconAddon icon={MailIcon} />
        <InputGroupInput id={id} type="email" value={email} readOnly />
      </InputGroup>
      <FieldDescription>{description}</FieldDescription>
    </Field>
  )
}

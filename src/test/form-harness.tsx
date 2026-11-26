import type { ReactNode } from "react"
import {
  type Control,
  type FieldErrors,
  type FieldValues,
  type UseFormProps,
  useForm,
} from "react-hook-form"

export type FormHarnessProps<TFieldValues extends FieldValues> = {
  defaultValues: UseFormProps<TFieldValues>["defaultValues"]
  errors?: FieldErrors<TFieldValues>
  children: (control: Control<TFieldValues>) => ReactNode
}

export function FormHarness<TFieldValues extends FieldValues>({
  defaultValues,
  errors,
  children,
}: FormHarnessProps<TFieldValues>) {
  const { control } = useForm<TFieldValues>({ defaultValues, errors })

  return <form noValidate>{children(control)}</form>
}

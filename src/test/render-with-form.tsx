import { render } from "@testing-library/react"
import type { ReactNode } from "react"
import {
  type Control,
  type FieldErrors,
  type FieldValues,
  type UseFormProps,
  useForm,
} from "react-hook-form"

type FormHarnessProps<TFieldValues extends FieldValues> = {
  defaultValues: UseFormProps<TFieldValues>["defaultValues"]
  errors?: FieldErrors<TFieldValues>
  children: (control: Control<TFieldValues>) => ReactNode
}

function FormHarness<TFieldValues extends FieldValues>({
  defaultValues,
  errors,
  children,
}: FormHarnessProps<TFieldValues>) {
  const { control } = useForm<TFieldValues>({ defaultValues, errors })

  return <form noValidate>{children(control)}</form>
}

export function renderWithForm<TFieldValues extends FieldValues>(
  props: FormHarnessProps<TFieldValues>,
) {
  return render(<FormHarness {...props} />)
}

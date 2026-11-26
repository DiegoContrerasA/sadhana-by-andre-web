import { render } from "@testing-library/react"
import type { FieldValues } from "react-hook-form"

import { FormHarness, type FormHarnessProps } from "./form-harness"

export function renderWithForm<TFieldValues extends FieldValues>(
  props: FormHarnessProps<TFieldValues>,
) {
  return render(<FormHarness {...props} />)
}

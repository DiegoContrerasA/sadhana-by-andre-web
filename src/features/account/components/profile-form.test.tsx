import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { NextIntlClientProvider } from "next-intl"
import { beforeEach, describe, expect, it, vi } from "vitest"

import messages from "../../../../messages/es.json"
import { updateProfile } from "../actions/update-profile"
import { ProfileForm } from "./profile-form"

vi.mock("../actions/update-profile", () => ({ updateProfile: vi.fn() }))

const copy = messages.profile.form

function renderForm() {
  render(
    <NextIntlClientProvider
      locale="es"
      messages={{ profile: messages.profile }}
    >
      <ProfileForm
        email="alumna@sadhana.test"
        defaultValues={{
          firstName: "Alumna",
          lastName: "Demo",
          phone: "3000000000",
        }}
      />
    </NextIntlClientProvider>,
  )

  return {
    firstName: screen.getByLabelText(copy.firstName),
    save: screen.getByRole("button", { name: copy.submit }),
  }
}

describe("ProfileForm", () => {
  beforeEach(() => {
    vi.mocked(updateProfile).mockReset().mockResolvedValue({ ok: true })
  })

  it("shows the account data with the email locked", () => {
    const { firstName } = renderForm()

    expect(firstName).toHaveValue("Alumna")
    expect(screen.getByLabelText(copy.email)).toHaveAttribute("readonly")
  })

  it("saves the changes and hides the notice once edited again", async () => {
    const { firstName, save } = renderForm()
    await userEvent.clear(firstName)
    await userEvent.type(firstName, "Ana")

    await userEvent.click(save)

    expect(updateProfile).toHaveBeenCalledWith(
      expect.objectContaining({ firstName: "Ana" }),
    )
    expect(await screen.findByRole("status")).toHaveTextContent(copy.success)

    await userEvent.type(firstName, "s")
    expect(screen.getByRole("status")).toBeEmptyDOMElement()
  })

  it("does not save invalid data", async () => {
    const { firstName, save } = renderForm()
    await userEvent.clear(firstName)

    await userEvent.click(save)

    expect(
      await screen.findByText(copy.errors.firstNameRequired),
    ).toBeInTheDocument()
    expect(updateProfile).not.toHaveBeenCalled()
  })

  it("keeps what was typed when saving fails", async () => {
    vi.mocked(updateProfile).mockRejectedValue(new Error("offline"))
    const { firstName, save } = renderForm()
    await userEvent.type(firstName, " María")

    await userEvent.click(save)

    expect(await screen.findByRole("alert")).toHaveTextContent(
      copy.errors.unknown,
    )
    expect(firstName).toHaveValue("Alumna María")
  })
})

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

import messages from "../../../../messages/es.json"
import { addFavorite } from "../actions/add-favorite"
import { removeFavorite } from "../actions/remove-favorite"
import { FavoriteButton } from "./favorite-button"

vi.mock("../actions/add-favorite", () => ({ addFavorite: vi.fn() }))
vi.mock("../actions/remove-favorite", () => ({ removeFavorite: vi.fn() }))

const copy = messages.favorites.button

function renderButton(isFavorite: boolean) {
  render(
    <FavoriteButton
      copy={copy}
      slug="tree"
      courseName="Árbol"
      isFavorite={isFavorite}
    />,
  )

  return screen.getByRole("button", { name: "Favorito: Árbol" })
}

describe("FavoriteButton", () => {
  beforeEach(() => {
    vi.mocked(addFavorite).mockReset()
    vi.mocked(removeFavorite).mockReset()
  })

  it("fills the heart at once while the favorite is being saved", async () => {
    const request = Promise.withResolvers<{ ok: true }>()
    vi.mocked(addFavorite).mockReturnValue(request.promise)
    const button = renderButton(false)

    await userEvent.click(button)

    expect(button).toHaveAttribute("aria-pressed", "true")
    expect(addFavorite).toHaveBeenCalledWith("tree")
    request.resolve({ ok: true })
  })

  it("removes a course that was already a favorite", async () => {
    vi.mocked(removeFavorite).mockResolvedValue({ ok: true })

    await userEvent.click(renderButton(true))

    expect(removeFavorite).toHaveBeenCalledWith("tree")
    expect(addFavorite).not.toHaveBeenCalled()
  })

  it("goes back and says so when the change cannot be saved", async () => {
    vi.mocked(addFavorite).mockRejectedValue(new Error("offline"))
    const button = renderButton(false)

    await userEvent.click(button)

    expect(await screen.findByRole("alert")).toHaveTextContent(copy.error)
    expect(button).toHaveAttribute("aria-pressed", "false")
  })
})

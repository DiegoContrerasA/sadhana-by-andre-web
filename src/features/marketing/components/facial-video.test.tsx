import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { FacialVideo } from "./facial-video"

describe("FacialVideo", () => {
  it("plays the video when the button is pressed", async () => {
    const play = vi
      .spyOn(HTMLMediaElement.prototype, "play")
      .mockResolvedValue()
    render(<FacialVideo playLabel="Play" pauseLabel="Pause" />)

    await userEvent.click(screen.getByRole("button", { name: "Play" }))

    expect(play).toHaveBeenCalledOnce()
  })

  it("offers to pause once the video is playing", () => {
    const { container } = render(
      <FacialVideo playLabel="Play" pauseLabel="Pause" />,
    )
    const video = container.querySelector("video")
    if (!video) throw new Error("video not rendered")

    fireEvent.play(video)

    expect(screen.getByRole("button", { name: "Pause" })).toBeInTheDocument()
  })
})

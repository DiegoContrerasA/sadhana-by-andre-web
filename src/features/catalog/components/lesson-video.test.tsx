import { render, screen } from "@testing-library/react"
import { Activity } from "react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { LessonVideo } from "./lesson-video"

const props = {
  label: "Video de la clase: La postura",
  src: "/videos/sample-lesson.mp4",
  posterUrl: "/videos/sample-lesson.jpg",
  captionsUrl: "/videos/sample-lesson.es.vtt",
  captionsLocale: "es",
  captionsLabel: "Español",
}

const pause = vi.fn()

describe("LessonVideo", () => {
  beforeEach(() => {
    pause.mockClear()
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(pause)
  })

  it("waits for the user to press play", () => {
    render(<LessonVideo {...props} />)

    const video = screen.getByLabelText(props.label)

    expect(video).toHaveAttribute("controls")
    expect(video).not.toHaveAttribute("autoplay")
  })

  it("pauses when the screen is hidden by navigation", () => {
    const { rerender } = render(
      <Activity mode="visible">
        <LessonVideo {...props} />
      </Activity>,
    )

    rerender(
      <Activity mode="hidden">
        <LessonVideo {...props} />
      </Activity>,
    )

    expect(pause).toHaveBeenCalledOnce()
  })
})

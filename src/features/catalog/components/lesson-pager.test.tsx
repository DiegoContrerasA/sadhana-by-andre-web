import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import messages from "../../../../messages/es.json"
import { LessonPager } from "./lesson-pager"

const lessons = [
  {
    slug: "the-pose",
    title: "La postura",
    description: "",
    durationMinutes: 3,
  },
  { slug: "foundation", title: "La base", description: "", durationMinutes: 5 },
]

describe("LessonPager", () => {
  it("offers only the next lesson on the first one", () => {
    render(
      <LessonPager
        copy={messages.catalog.lesson}
        courseHref="/courses/tree"
        lessons={lessons}
        next={lessons[1]}
      />,
    )

    expect(screen.getAllByRole("link")).toHaveLength(1)
    expect(
      screen.getByRole("link", { name: /Siguiente clase.*La base/ }),
    ).toHaveAttribute("href", "/courses/tree/foundation")
  })

  it("goes back to the course address for the first lesson", () => {
    render(
      <LessonPager
        copy={messages.catalog.lesson}
        courseHref="/courses/tree"
        lessons={lessons}
        previous={lessons[0]}
      />,
    )

    expect(
      screen.getByRole("link", { name: /Anterior.*La postura/ }),
    ).toHaveAttribute("href", "/courses/tree")
  })
})

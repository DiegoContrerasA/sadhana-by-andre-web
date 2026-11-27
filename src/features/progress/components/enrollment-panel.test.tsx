import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

import messages from "../../../../messages/es.json"
import { enrollCourse } from "../actions/enroll-course"
import { unenrollCourse } from "../actions/unenroll-course"
import { EnrollmentPanel } from "./enrollment-panel"

vi.mock("../actions/enroll-course", () => ({ enrollCourse: vi.fn() }))
vi.mock("../actions/unenroll-course", () => ({ unenrollCourse: vi.fn() }))

const copy = messages.myCourses.enrollment

function renderPanel(isEnrolled: boolean) {
  render(
    <EnrollmentPanel
      copy={copy}
      slug="tree"
      hint="Inscríbete para ver las 4 clases."
      isEnrolled={isEnrolled}
      myCoursesHref="/my-courses"
    />,
  )
}

describe("EnrollmentPanel", () => {
  beforeEach(() => {
    vi.mocked(enrollCourse).mockReset().mockResolvedValue({ ok: true })
    vi.mocked(unenrollCourse).mockReset().mockResolvedValue({ ok: true })
  })

  it("enrols in the course", async () => {
    renderPanel(false)

    await userEvent.click(screen.getByRole("button", { name: copy.enroll }))

    expect(enrollCourse).toHaveBeenCalledWith("tree")
  })

  it("links to My courses and lets the user cancel the enrolment", async () => {
    renderPanel(true)

    expect(screen.getByRole("link", { name: copy.view })).toHaveAttribute(
      "href",
      "/my-courses",
    )
    await userEvent.click(screen.getByRole("button", { name: copy.cancel }))

    expect(unenrollCourse).toHaveBeenCalledWith("tree")
  })

  it("says so when the change cannot be saved", async () => {
    vi.mocked(enrollCourse).mockRejectedValue(new Error("offline"))
    renderPanel(false)

    await userEvent.click(screen.getByRole("button", { name: copy.enroll }))

    expect(await screen.findByRole("alert")).toHaveTextContent(copy.error)
  })
})

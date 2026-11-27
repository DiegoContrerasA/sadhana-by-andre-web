import { CheckIcon } from "lucide-react"
import type { Messages } from "next-intl"

import { EnrollButton } from "./enroll-button"
import { EnrolledActions } from "./enrolled-actions"

type EnrollmentPanelProps = {
  copy: Messages["myCourses"]["enrollment"]
  slug: string
  hint: string
  isEnrolled: boolean
  myCoursesHref: string
}

export function EnrollmentPanel({
  copy,
  slug,
  hint,
  isEnrolled,
  myCoursesHref,
}: EnrollmentPanelProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-primary/15 bg-background p-4">
      <p role="status" className="flex items-center gap-2 text-sm">
        {isEnrolled ? (
          <CheckIcon aria-hidden="true" className="size-4 text-primary" />
        ) : null}
        {isEnrolled ? copy.enrolled : hint}
      </p>
      {isEnrolled ? (
        <EnrolledActions
          slug={slug}
          viewLabel={copy.view}
          cancelLabel={copy.cancel}
          errorLabel={copy.error}
          myCoursesHref={myCoursesHref}
        />
      ) : (
        <EnrollButton slug={slug} label={copy.enroll} errorLabel={copy.error} />
      )}
    </div>
  )
}

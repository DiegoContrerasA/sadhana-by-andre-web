"use client"

import { LinkButton } from "@/components/link-button"
import { Button } from "@/components/ui/button"
import { useIsHydrated } from "@/hooks/use-is-hydrated"

import { useCourseEnrollment } from "../hooks/use-course-enrollment"

type EnrolledActionsProps = {
  slug: string
  viewLabel: string
  cancelLabel: string
  errorLabel: string
  myCoursesHref: string
}

export function EnrolledActions({
  slug,
  viewLabel,
  cancelLabel,
  errorLabel,
  myCoursesHref,
}: EnrolledActionsProps) {
  const isHydrated = useIsHydrated()
  const { isPending, hasFailed, unenroll } = useCourseEnrollment(slug)

  return (
    <div className="flex flex-col items-start gap-3">
      <LinkButton href={myCoursesHref} variant="outline-primary" size="pill">
        {viewLabel}
      </LinkButton>
      <Button
        variant="link"
        size="xs"
        className="px-0 text-muted-foreground"
        disabled={!isHydrated || isPending}
        onClick={unenroll}
      >
        {cancelLabel}
      </Button>
      {hasFailed ? (
        <p role="alert" className="text-sm text-destructive">
          {errorLabel}
        </p>
      ) : null}
    </div>
  )
}

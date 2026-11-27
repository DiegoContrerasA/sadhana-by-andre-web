"use client"

import type { VariantProps } from "class-variance-authority"
import { PlusIcon } from "lucide-react"

import { Button, type buttonVariants } from "@/components/ui/button"
import { useIsHydrated } from "@/hooks/use-is-hydrated"

import { useCourseEnrollment } from "../hooks/use-course-enrollment"

type EnrollButtonProps = {
  slug: string
  label: string
  errorLabel: string
  variant?: VariantProps<typeof buttonVariants>["variant"]
}

export function EnrollButton({
  slug,
  label,
  errorLabel,
  variant = "default",
}: EnrollButtonProps) {
  const isHydrated = useIsHydrated()
  const { isPending, hasFailed, enroll } = useCourseEnrollment(slug)

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant={variant}
        size="pill"
        disabled={!isHydrated || isPending}
        aria-busy={isPending}
        onClick={enroll}
      >
        <PlusIcon aria-hidden="true" />
        {label}
      </Button>
      {hasFailed ? (
        <p role="alert" className="text-sm">
          {errorLabel}
        </p>
      ) : null}
    </div>
  )
}

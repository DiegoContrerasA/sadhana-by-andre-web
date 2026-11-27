import { getMessages } from "next-intl/server"

import { EnrollButton } from "./enroll-button"

export async function UnlockCourseButton({ slug }: { slug: string }) {
  const { myCourses } = await getMessages()
  const { enroll, error } = myCourses.enrollment

  return (
    <EnrollButton
      slug={slug}
      label={enroll}
      errorLabel={error}
      variant="inverse"
    />
  )
}

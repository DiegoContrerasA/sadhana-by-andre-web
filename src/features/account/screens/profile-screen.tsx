import { getMessages } from "next-intl/server"
import { type ComponentProps, Suspense } from "react"

import { SectionHeading } from "@/components/section-heading"

import { AccountDetails } from "../components/account-details"
import { AccountSettings } from "../components/account-settings"
import { ProfileSkeleton } from "../components/profile-skeleton"

type ProfileScreenProps = ComponentProps<typeof AccountSettings> &
  Omit<ComponentProps<typeof AccountDetails>, "children">

export async function ProfileScreen({
  myCoursesHref,
  favoritesHref,
  ...settings
}: ProfileScreenProps) {
  const { app } = await getMessages()
  const { title, heading, headingEm, subtitle } = app.sections.profile

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading
        label={title}
        heading={heading}
        headingEm={headingEm}
        subtitle={subtitle}
      />
      <Suspense fallback={<ProfileSkeleton />}>
        <AccountDetails
          myCoursesHref={myCoursesHref}
          favoritesHref={favoritesHref}
        >
          <AccountSettings {...settings} />
        </AccountDetails>
      </Suspense>
    </div>
  )
}

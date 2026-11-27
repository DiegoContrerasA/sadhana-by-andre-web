import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import type { ReactNode } from "react"

import { getEnrolledCount, getFavoriteCount } from "@/features/progress/server"

import { getAccount } from "../data/get-account"
import { ProfileForm } from "./profile-form"
import { ProfileSection } from "./profile-section"
import { ProfileStat } from "./profile-stat"
import { ProfileSummary } from "./profile-summary"

type AccountDetailsProps = {
  myCoursesHref: string
  favoritesHref: string
  children: ReactNode
}

export async function AccountDetails({
  myCoursesHref,
  favoritesHref,
  children,
}: AccountDetailsProps) {
  const [{ profile }, account, enrolled, favorites] = await Promise.all([
    getMessages(),
    getAccount(),
    getEnrolledCount(),
    getFavoriteCount(),
  ])
  const { email, ...defaultValues } = account

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start">
      <ProfileSummary account={account}>
        <ProfileStat
          value={enrolled}
          label={profile.stats.courses}
          href={myCoursesHref}
        />
        <ProfileStat
          value={favorites}
          label={profile.stats.favorites}
          href={favoritesHref}
        />
      </ProfileSummary>
      <div className="flex flex-col gap-6">
        <ProfileSection title={profile.form.title}>
          <NextIntlClientProvider messages={{ profile }}>
            <ProfileForm email={email} defaultValues={defaultValues} />
          </NextIntlClientProvider>
        </ProfileSection>
        {children}
      </div>
    </div>
  )
}

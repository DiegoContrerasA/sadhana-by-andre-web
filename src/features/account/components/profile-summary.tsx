import type { ReactNode } from "react"

import type { Account } from "../schema/profile.schema"
import { getInitials } from "../utils/get-initials"

type ProfileSummaryProps = {
  account: Account
  children: ReactNode
}

export function ProfileSummary({ account, children }: ProfileSummaryProps) {
  const { firstName, lastName, email } = account

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-primary/15 bg-background p-6 text-center">
      <span
        aria-hidden="true"
        className="flex size-20 items-center justify-center rounded-full bg-primary text-2xl tracking-widest text-primary-foreground"
      >
        {getInitials(firstName, lastName)}
      </span>
      <div className="flex w-full flex-col gap-1">
        <p className="text-xl wrap-break-word">
          {firstName} {lastName}
        </p>
        <p className="text-sm break-all text-muted-foreground">{email}</p>
      </div>
      <div className="flex w-full gap-3">{children}</div>
    </div>
  )
}

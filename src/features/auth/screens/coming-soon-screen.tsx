import { getMessages } from "next-intl/server"

import { LinkButton } from "@/components/link-button"

type ComingSoonScreenProps = {
  page: "signUp" | "forgotPassword"
  signInHref: string
}

export async function ComingSoonScreen({
  page,
  signInHref,
}: ComingSoonScreenProps) {
  const { auth } = await getMessages()

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl md:text-5xl">{auth[page].title}</h1>
        <p className="text-muted-foreground">{auth.comingSoon.body}</p>
      </div>
      <LinkButton href={signInHref} variant="outline">
        {auth.comingSoon.back}
      </LinkButton>
    </div>
  )
}

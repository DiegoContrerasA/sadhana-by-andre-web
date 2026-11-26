import { getMessages } from "next-intl/server"

import { SignUpForm } from "../components/sign-up-form"

type SignUpScreenProps = {
  signInHref: string
}

export async function SignUpScreen({ signInHref }: SignUpScreenProps) {
  const { auth } = await getMessages()

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl md:text-5xl">{auth.signUp.title}</h1>
      <SignUpForm signInHref={signInHref} />
    </div>
  )
}

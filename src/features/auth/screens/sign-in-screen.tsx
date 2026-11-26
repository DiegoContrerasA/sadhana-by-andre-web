import { getMessages } from "next-intl/server"

import { SignInForm } from "../components/sign-in-form"

type SignInScreenProps = {
  signUpHref: string
  forgotPasswordHref: string
}

export async function SignInScreen({
  signUpHref,
  forgotPasswordHref,
}: SignInScreenProps) {
  const { auth } = await getMessages()

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl md:text-5xl">{auth.signIn.title}</h1>
      <SignInForm
        signUpHref={signUpHref}
        forgotPasswordHref={forgotPasswordHref}
      />
    </div>
  )
}

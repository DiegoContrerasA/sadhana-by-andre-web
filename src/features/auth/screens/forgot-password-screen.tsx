import { getMessages } from "next-intl/server"

import { ForgotPasswordForm } from "../components/forgot-password-form"

type ForgotPasswordScreenProps = {
  signInHref: string
  mockResetHref: string
}

export async function ForgotPasswordScreen(props: ForgotPasswordScreenProps) {
  const { auth } = await getMessages()

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl md:text-5xl">{auth.forgotPassword.title}</h1>
        <p className="text-muted-foreground">
          {auth.forgotPassword.description}
        </p>
      </div>
      <ForgotPasswordForm {...props} />
    </div>
  )
}

import { getMessages } from "next-intl/server"

import { LinkButton } from "@/components/link-button"

import { ResetPasswordForm } from "../components/reset-password-form"
import { getMockResetToken } from "../data/get-mock-reset-token"

type ResetPasswordScreenProps = {
  token: unknown
  signInHref: string
  forgotPasswordHref: string
}

export async function ResetPasswordScreen({
  token,
  signInHref,
  forgotPasswordHref,
}: ResetPasswordScreenProps) {
  const { auth } = await getMessages()
  const copy = auth.resetPassword

  if (typeof token !== "string" || token !== getMockResetToken()) {
    return (
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl md:text-5xl">{copy.invalidTitle}</h1>
        <LinkButton href={forgotPasswordHref}>{copy.requestNew}</LinkButton>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl md:text-5xl">{copy.title}</h1>
      <ResetPasswordForm token={token} signInHref={signInHref} />
    </div>
  )
}

import type { Locale } from "next-intl"
import { getMessages } from "next-intl/server"

import { LinkButton } from "@/components/link-button"
import { getWhatsappUrl } from "@/utils/whatsapp-url"

import { LanguageOptions } from "./language-options"
import { ProfileSection } from "./profile-section"

type AccountSettingsProps = {
  locale: Locale
  languageHrefs: Record<Locale, string>
  changePasswordHref: string
}

export async function AccountSettings({
  locale,
  languageHrefs,
  changePasswordHref,
}: AccountSettingsProps) {
  const { profile } = await getMessages()
  const { language, security, help } = profile

  return (
    <>
      <ProfileSection title={language.title}>
        <LanguageOptions current={locale} hrefs={languageHrefs} />
      </ProfileSection>
      <ProfileSection title={security.title} description={security.hint}>
        <LinkButton
          href={changePasswordHref}
          variant="outline-primary"
          size="pill"
          className="self-start"
        >
          {security.changePassword}
        </LinkButton>
      </ProfileSection>
      <ProfileSection title={help.title} description={help.hint}>
        <LinkButton
          href={getWhatsappUrl(help.message)}
          variant="outline-primary"
          size="pill"
          className="self-start"
          isExternal
        >
          {help.whatsapp}
        </LinkButton>
      </ProfileSection>
    </>
  )
}

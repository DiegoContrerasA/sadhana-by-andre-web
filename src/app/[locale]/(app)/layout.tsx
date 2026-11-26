import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"

import { AppNavigation } from "@/features/app-shell"

const sectionHrefs = {
  courses: "/courses",
  myCourses: "/my-courses",
  favorites: "/favorites",
  profile: "/profile",
}

export default async function AppLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const { app } = await getMessages()

  return (
    <NextIntlClientProvider messages={{}}>
      <div className="flex flex-1 flex-col bg-secondary">
        <AppNavigation
          label={app.navLabel}
          homeLabel={app.homeLabel}
          labels={app.nav}
          hrefs={sectionHrefs}
        />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-8 pb-24 sm:px-6 md:pt-12 md:pb-16">
          {children}
        </main>
      </div>
    </NextIntlClientProvider>
  )
}

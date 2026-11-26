import { getLocale, getMessages } from "next-intl/server"

import { AboutSection } from "../components/about-section"
import { EventsSection } from "../components/events-section"
import { FacialYogaSection } from "../components/facial-yoga-section"
import { FaqSection } from "../components/faq-section"
import { GallerySection } from "../components/gallery-section"
import { Hero } from "../components/hero"
import { JsonLd } from "../components/json-ld"
import { KobidoSection } from "../components/kobido-section"
import { PositionsSection } from "../components/positions-section"
import { ScheduleSection } from "../components/schedule-section"
import { ServicesSection } from "../components/services-section"
import { SiteFooter } from "../components/site-footer"
import { TrialClassSection } from "../components/trial-class-section"
import { getCurrentYear } from "../data/get-current-year"
import type { LanguageHrefs } from "../utils/home-metadata"
import { buildSiteSchema } from "../utils/structured-data"

type HomeScreenProps = {
  languageHrefs: LanguageHrefs
}

export async function HomeScreen({ languageHrefs }: HomeScreenProps) {
  const [locale, content, year] = await Promise.all([
    getLocale(),
    getMessages(),
    getCurrentYear(),
  ])

  return (
    <>
      <JsonLd schema={buildSiteSchema(content.meta)} />
      <Hero
        hero={content.hero}
        nav={content.nav}
        locale={locale}
        languageHrefs={languageHrefs}
      />
      <main>
        <AboutSection about={content.about} />
        <PositionsSection positions={content.positions} />
        <ScheduleSection schedule={content.schedule} />
        <ServicesSection services={content.services} />
        <TrialClassSection cta={content.cta} />
        <FacialYogaSection yogaFacial={content.yogaFacial} />
        <KobidoSection kobido={content.kobido} />
        <EventsSection events={content.events} />
        <GallerySection gallery={content.gallery} />
        <FaqSection faq={content.faq} />
      </main>
      <SiteFooter footer={content.footer} year={year} />
    </>
  )
}

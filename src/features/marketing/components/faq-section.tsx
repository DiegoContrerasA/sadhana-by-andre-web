import type { Messages } from "next-intl"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { buildFaqSchema } from "../utils/structured-data"
import { JsonLd } from "./json-ld"
import { SectionHeader } from "./section-header"

type FaqSectionProps = {
  faq: Messages["faq"]
}

export function FaqSection({ faq }: FaqSectionProps) {
  return (
    <section id="faq" className="scroll-mt-8 px-6 py-24 md:px-12 md:py-32">
      <JsonLd schema={buildFaqSchema(faq.items)} />
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label={faq.label}
          heading={faq.heading}
          headingEm={faq.headingEm}
          className="mb-16"
        />
        <Accordion hiddenUntilFound>
          {faq.items.map(({ question, answer }) => (
            <AccordionItem key={question} value={question}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

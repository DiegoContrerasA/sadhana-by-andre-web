import Image from "next/image"
import type { Messages } from "next-intl"

import servicesImage from "../assets/services.jpeg"
import { SectionHeader } from "./section-header"
import { ServiceItem } from "./service-item"

type ServicesSectionProps = {
  services: Messages["services"]
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section
      id="servicios"
      className="scroll-mt-8 bg-secondary px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label={services.label}
          heading={services.heading}
          headingEm={services.headingEm}
          className="mb-20"
        />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="hidden lg:block">
            <Image
              src={servicesImage}
              alt={services.imgAlt}
              sizes="(min-width: 1024px) 40vw, 1px"
              className="sticky top-24 mx-auto h-auto max-h-[650px] w-auto"
            />
          </div>
          <ul className="border-b border-border">
            {services.items.map((service) => (
              <ServiceItem key={service.num} service={service} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

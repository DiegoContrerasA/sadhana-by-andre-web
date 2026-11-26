import Image from "next/image"
import type { Messages } from "next-intl"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

import flexibilityImage from "../assets/flexibility.jpeg"
import restorationImage from "../assets/restoration.jpeg"
import strengthImage from "../assets/strength.jpeg"
import { SectionDivider } from "./section-divider"
import { SectionHeader } from "./section-header"

const images = [strengthImage, flexibilityImage, restorationImage]

type PositionsSectionProps = {
  positions: Messages["positions"]
}

export function PositionsSection({ positions }: PositionsSectionProps) {
  return (
    <section
      id="posturas"
      className="overflow-hidden bg-secondary px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        <SectionHeader
          label={positions.label}
          heading={positions.heading}
          headingEm={positions.headingEm}
          className="mb-20"
        />
        <ul className="grid w-full grid-cols-1 items-start gap-4 md:grid-cols-3 md:gap-5">
          {positions.poses.map((pose, index) => (
            <li
              key={pose.label}
              className={cn(
                "group relative aspect-3/4 overflow-hidden",
                index === 1 && "md:mt-10",
              )}
            >
              <Image
                src={images[index] ?? strengthImage}
                alt={pose.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
              />
              <Badge size="label" className="absolute top-4 left-4">
                {pose.label}
              </Badge>
            </li>
          ))}
        </ul>
        <SectionDivider className="mt-16" />
      </div>
    </section>
  )
}

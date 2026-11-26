import type { Messages } from "next-intl"

type AboutStoryProps = {
  about: Messages["about"]
}

export function AboutStory({ about }: AboutStoryProps) {
  const paragraphs = [about.p1, about.p2, about.p3, about.p4]

  return (
    <div className="flex flex-col gap-5 leading-relaxed">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <blockquote className="border-l-2 border-primary pl-5 text-lg leading-snug font-light text-primary italic md:text-xl">
        <p>{about.quote}</p>
      </blockquote>
    </div>
  )
}

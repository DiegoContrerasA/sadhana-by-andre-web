const placeholderCards = ["first", "second", "third"]

export function MyCoursesSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid animate-pulse grid-cols-2 gap-3 motion-reduce:animate-none sm:gap-5 md:grid-cols-3"
    >
      {placeholderCards.map((card) => (
        <div
          key={card}
          className="aspect-4/5 rounded-xl border border-primary/15 bg-background"
        />
      ))}
    </div>
  )
}

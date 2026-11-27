const placeholderCards = ["first", "second", "third"]

export function CourseCatalogSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex animate-pulse flex-col gap-8 motion-reduce:animate-none"
    >
      <div className="h-52 rounded-xl border border-primary/15 bg-background" />
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
        {placeholderCards.map((card) => (
          <div
            key={card}
            className="aspect-4/5 rounded-xl border border-primary/15 bg-background"
          />
        ))}
      </div>
    </div>
  )
}

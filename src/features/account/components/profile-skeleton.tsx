export function ProfileSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="grid animate-pulse gap-6 motion-reduce:animate-none lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start"
    >
      <div className="h-72 rounded-xl border border-primary/15 bg-background" />
      <div className="h-96 rounded-xl border border-primary/15 bg-background" />
    </div>
  )
}
